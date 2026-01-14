import { useRef, useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";
interface Props{

meetingName:string;
}
export const CallUI=({meetingName}:Props)=>{
     const hasJoinedRef = useRef(false);
       const hasLeftRef = useRef(false);
    const call=useCall();
    const [show, setShow]=useState<"lobby"|"call"|"ended">("lobby");
    const handleJoin=async()=>{
        if (!call ) return; 
        hasJoinedRef.current=true
    await call.join();
    setShow("call");
    }
    const handleLeave=async()=>{
       if (!call) return;

   hasLeftRef.current=true
    await call.endCall();   // ✅ correct
    setShow("ended");
    }
    return(
        <StreamTheme className="h-full">
            {show==="lobby" &&<CallLobby onJoin={handleJoin}/>}
             {show==="call" &&<CallActive meetingName={meetingName} onLeave={handleLeave} />}
              {show==="ended" &&<CallEnded/>}



        </StreamTheme>
    )

}