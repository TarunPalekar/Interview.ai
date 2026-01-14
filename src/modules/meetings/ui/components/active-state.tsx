
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon} from "lucide-react"

import { useRouter } from "next/navigation"

interface Props {
    meetingId: string;



}

export const ActiveState = ({
    meetingId,

}: Props) => {
    const router=useRouter();
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                image="/upcoming.svg"
                title="Meeting is active"
                description="Meeting will end once all participants have left"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                    variant="secondary"
                    className="w-full lg:w-auto"
                    onClick={()=>router.push(`/call/${meetingId}`)}

                >
                    <BanIcon />
                    Join Meeting
                </Button>
                {/* <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
        <Link href={`/call/${meetingId}`}>
          <VideoIcon/>
        </Link>
      
        Start Meeting
    </Button> */}

            </div>

        </div>
    )

}