import {CommandResponsiveDialog, CommandInput } from "@/components/ui/command";
import { CommandItem, CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";

interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}
 
export const DashboardCommand=({open, setOpen}:Props)=>{
    return(
        <CommandResponsiveDialog open={open} onOpenChange={setOpen} title="find the agent as you need" description="any agent">
           < CommandInput
           placeholder="Find a meeting or agent"
           />
           <CommandList>
            <CommandItem>
                test
            </CommandItem>
           </CommandList>
        </CommandResponsiveDialog >
    )
}