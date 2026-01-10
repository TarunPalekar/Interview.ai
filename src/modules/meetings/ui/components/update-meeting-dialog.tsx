"use client"
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { MeetingForm } from "./meeting-form"
import { on } from "events";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";


interface UpdateMeetingDialogProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    initialValues:MeetingGetOne
}

export const UpdateMeetingDialog=({
    open,
    onOpenChange,
    initialValues
}:UpdateMeetingDialogProps)=>{
    const router=useRouter();
    return(
        <ResponsiveDialog
        title="Edit Meeting"
        description="Edit a Meeting Details"
        open={open}
        onOpenChange={onOpenChange}
        >
         <MeetingForm
                    
                   onSuccess={(id)=>{
                    onOpenChange(false)
                    router.push(`/dashboard/meetings/${id}`)
                   }}
                   onCancel={()=>onOpenChange(false)}
                   initialValues={initialValues}
                   />
        </ResponsiveDialog>
    )

}
