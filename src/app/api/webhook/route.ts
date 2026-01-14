import {
    CallEndedEvent,
  
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
           openAiApiKey:process.env.OPENAI_API_KEY!,
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
                status: "processing",
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



    return NextResponse.json({ status: "ok" })
}

