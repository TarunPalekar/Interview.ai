import { ResponsiveDialog } from "@/components/responsive-dialog";
import { on } from "events";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps{
    open:boolean;
    onOpenchange:(open:boolean)=>void;
    initialValues:AgentGetOne
}

export const UpdateAgentDialog=({
    open,
    onOpenchange,
    initialValues,
}:UpdateAgentDialogProps)=>{
    return(
        <ResponsiveDialog
        title="Edit Agent"
        description="Edit the agent details"
        open={open}
        onOpenChange={onOpenchange}
        >
           <AgentForm
           onSuccess={()=>onOpenchange(false)}
           onCancel={()=>onOpenchange(false)}
           initialValues={initialValues}
           />
        </ResponsiveDialog>
    )

}
