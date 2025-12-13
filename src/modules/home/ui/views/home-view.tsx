import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import{Button} from "@/components/ui/button"

export const HomeView=()=>{
    const session=authClient.getSession();
    const router=useRouter()
    return (
        <div className="flex flex-col p-4 gay-y-4">
            {/* <p>Logged in as {session.user.name}</p> */}
            <Button onClick={()=>authClient.signOut({
                fetchOptions:{onSuccess:()=>router.push("/sign-in") }
            })}>

            </Button>

        </div>
    )
}