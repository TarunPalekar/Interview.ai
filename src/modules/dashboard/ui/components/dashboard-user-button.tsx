import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {

    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
   
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

 const DashboarduserButton=()=>{
    const router=useRouter();
    const isMobile=useIsMobile();
    
    const {data, isPending}=authClient.useSession();
    console.log(data)
    if(!data?.user){
        return null;
    }
    const onLogout=()=>{
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    router.push("/sign-in")
                }
            }
        })
    }
    if(isMobile){
        return(
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full  flex items-center justify-between bg-white/5 hover:bg-white/10 gap-2 overflow-hidden">
{data.user.image?(<Avatar>
    <AvatarImage src={data.user.image}/>
</Avatar>):(
    <GeneratedAvatar
    seed={data.user.name}
    variant="initials"
    className="size-9 mr-3"
    />

    
)}
<div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
    <p className="text-sm truncate w-full">
        {data.user.name}
          
    </p>
    <p className="text-xs truncate w-full">
        {data.user.email}

    </p>

    
</div>
<ChevronDownIcon className="size-4 shrink-0"/>

                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerTitle>{data.user.email}</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                        variant="outline"
                        onClick={()=>{}}
                        >
                            <CreditCardIcon className="size-4 text-black" />
                            Billing

                        </Button>
                        <Button
                        variant="outline"
                        onClick={onLogout}
                        >
<LogOutIcon className="size-4 text-black"/>
Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    };
    
    return(
        
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full  flex items-center justify-between bg-white/5 hover:bg-white/10 gap-2 overflow-hidden">
{data.user.image?(
    <Avatar>
        <AvatarImage src={data.user.image}/>
    </Avatar>
):(
    <GeneratedAvatar
     seed={data.user.name}
     variant="botttsNeutral"
     className="size-9 mr-3"

    />
)}
<div className="flex flex-col gap-0.5  text-left overflow-hidden flex-1 mon-w-0">
    <p>
        {data.user.name}
    </p>
    <p>
     {data.user.email}
    </p>


</div>
<ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right"  className="w-72 h-40 ml-2 ">
            <DropdownMenuLabel>
                <div className="flex flex-col  gap-2">
                <span className="font-medium truncate">{data.user.name}</span>
                <span className="text-sm font-normal text-muted-foreground truncate"> {data.user.email}</span>

                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator>
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon/>

                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center justify-between">
                      Logout
                    <LogOutIcon/>
                </DropdownMenuItem>
            </DropdownMenuSeparator>
          </DropdownMenuContent>
        </DropdownMenu>
    )

}
export default DashboarduserButton;