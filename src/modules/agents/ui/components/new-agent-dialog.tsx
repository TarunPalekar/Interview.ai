import { ResponsiveDialog } from "@/components/responsive-dialog";
import { on } from "events";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps{
    open:boolean;
    onOpenchange:(open:boolean)=>void;
}

export const NewAgentDialog=({
    open,
    onOpenchange,
}:NewAgentDialogProps)=>{
    return(
        <ResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={onOpenchange}
        >
           <AgentForm
           onSuccess={()=>onOpenchange(false)}
           onCancel={()=>onOpenchange(false)}
           />
        </ResponsiveDialog>
    )

}
