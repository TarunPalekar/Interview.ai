import {
    CallEndedEvent,
    MessageNewEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent,
} from "@stream-io/node-sdk"
import { and, eq, not } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/database"
import { agents, meetings } from "@/database/schema"
import { streamVideo } from "@/lib/stream-video"
import { inngest } from "@/inngest/client"
import OpenAi from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import { streamChat } from "@/lib/stream-chat"
import { generateAvatarUri } from "@/lib/avatar"
import {GoogleGenAI} from '@google/genai';



const openaiClient = new OpenAi({ apiKey: process.env.OPENAI_API_KEY! })
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


function verifySignatureWithSdk(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature);
}
export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature")
    const apiKey = req.headers.get("x-api-key");
    console.log(signature, apiKey, "signature and api key")
    if (!signature || !apiKey) {
        return NextResponse.json(
            { error: "Missing signature or api key" },
            { status: 400 },
        )
    }
    const body = await req.text();
    if (!verifySignatureWithSdk(body, signature)) {
        return NextResponse.json({ error: "invalid signature" }, { status: 401 })

    }
    let payload: unknown
    try {
        payload = JSON.parse(body) as Record<string, unknown>;


    }
    catch {
        return NextResponse.json({ error: "Invalid json" }, { status: 400 })
    }
    const eventType = (payload as Record<string, unknown>)?.type;

    if (eventType === "call.session_started") {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;
        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingId" }, { status: 400 })
        }
        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, meetingId),
                    not(eq(meetings.status, "completed")),

                    not(eq(meetings.status, "active")),
                    not(eq(meetings.status, "cancelled")),
                )
            )

        if (!existingMeeting) {
            return NextResponse.json({ error: "meeting not found" }, { status: 404 })
        }
        await db.update(meetings)
            .set({
                status: "active",
                startedAt: new Date(),
            })
            .where(eq(meetings.id, existingMeeting.id))

        const [existingAgent] = await db.select()
            .from(agents)
            .where(eq(agents.id, existingMeeting.agentId))

        if (!existingAgent) {
            return NextResponse.json({ error: "agent not found" }, { status: 404 })
        }

        const call = streamVideo.video.call("default", existingMeeting.id)
        console.log(call, "call")
        console.log("AI CONNECTING...");

        const realtimeClient = await streamVideo.video.connectOpenAi({
            call,
            openAiApiKey: process.env.OPENAI_API_KEY!,
            agentUserId: existingAgent.id,
            model: "gpt-4o-realtime-preview",



        })


        realtimeClient.updateSession({
            instructions: "You are a helpful assistant that can answer questions and help with tasks.",


        });
        realtimeClient.sendUserMessageContent();




    }
    else if (eventType === "call.session_participant_left") {
        const event = payload as CallSessionParticipantLeftEvent
        const meetingId = event.call_cid.split(":")[1];
        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingid" }, { status: 400 })
        }
        const call = streamVideo.video.call("default", meetingId)
        await call.end();

    }
    else if (eventType === "call.session_ended") {
        const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;
        if (!meetingId) {
            return NextResponse.json({ error: "missing meetingid" }, { status: 400 })
        }
        await db.update(meetings)
            .set({
                status: "completed",
                endedAt: new Date(),
            })
            .where(
                and(
                    eq(meetings.id, meetingId),
                    eq(meetings.status, "active")
                )
            )
    }
    else if (eventType === "call.transcription_ready") {
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        const [updateMeeting] = await db.update(meetings)
            .set({
                transcriptUrl: event.call_transcription.url,
            })
            .where(eq(meetings.id, meetingId))
            .returning();
        if (!updateMeeting) {
            return NextResponse.json({ error: "meeting not found" }, { status: 400 })
        }
        await inngest.send({
            name: "meetings/processing",
            data: {
                MeetingId: updateMeeting.id,
                transcriptUrl: updateMeeting.transcriptUrl,
            }
        })
    }

    else if (eventType === "call.recording_ready") {
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        await db.update(meetings)
            .set({
                recordingUrl: event.call_recording.url,

            })
            .where(eq(meetings.id, meetingId));
    }
    else if (eventType === "message.new") {
        const event = payload as MessageNewEvent;
        const userId = event.user?.id
        const channelId = event.channel_id;
        const text = event.message?.text;
        if (!userId || !channelId || !text) {
            return NextResponse.json({ error: "Missing required fields" }, {
                status: 400
            })
        }

        const [existingMeeting] = await db.select()
            .from(meetings)
            .where(
                and(eq(meetings.id, channelId), eq(meetings.status, "completed"))
            )
        if (!existingMeeting) {
            return NextResponse.json({ error: "Meeting not found" }, {
                status: 404
            })
        }
        const [existingAgent] = await db.select()
            .from(agents)
            .where(and(eq(agents.id, existingMeeting.agentId)))
        if (!existingAgent) {
            return NextResponse.json({ error: "Agent not found" }, {
                status: 404
            })
        }
        if (userId !== existingAgent.id) {
            const instructions = ` 
      You are an AI assistant helping the user revisit a recently completed meeting.
      Below is a summary of the meeting, generated from the transcript:
      
      ${existingMeeting.summary}
      
      The following are your original instructions from the live meeting assistant.Please continue to follow these behavioral guidelines as you assist the user:
      
      ${existingAgent.instructions}
      
      The user may ask questions about the meeting, request clarifications, or ask for follow - up actions.
      Always base your responses on the meeting summary above.
      
      You also have access to the recent conversation history between you and the user.Use the context of previous messages to provide relevant, coherent, and helpful responses.If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.

                Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
                `;
            const channel = streamChat.channel("messaging", channelId)
            await channel.watch();
            const previousMessages = channel.state.messages
                .slice(-5)
                .filter((msg) => msg.text && msg.text.trim() !== "")
                .map<ChatCompletionMessageParam>((message) => ({
                    role: message.user?.id === existingAgent.id ? "assistant" : "user",
                    content: message.text || "",
                }))
                 const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Why is the sky blue?',
  });

            // const GPTResponse = await openaiClient.chat.completions.create({
            //     messages: [
            //         { role: "system", content: instructions },
            //         ...previousMessages,
            //         { role: "user", content: text },
            //     ],
            //     model: "gpt-4o"
            // })
            const GPTResponseText = response.text
            if (!GPTResponseText) {
                return NextResponse.json({ error: "no response from gpt" }, { status: 400 })
            }
            const avatarUrl = generateAvatarUri({
                seed: existingAgent.name,
                variant: "botttsNeutral",
            })
            streamChat.upsertUser({
                id: existingAgent.id,
                name: existingAgent.name,
                image: avatarUrl,
            })
            channel.sendMessage({
                text: GPTResponseText,
                user: {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    image: avatarUrl,
                }
            })
        }
    }



    return NextResponse.json({ status: "ok" })
}

