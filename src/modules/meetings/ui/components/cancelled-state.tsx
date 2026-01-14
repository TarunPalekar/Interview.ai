
import { EmptyState } from "@/components/empty-state"

export const CancelledState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                image="/cancelled.svg"
                title="Meeting Cancelled"
                description="This meeting was cancelled"
            />
            {/* <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                    variant="secondary"
                    className="w-full lg:w-auto"

                >
                    <BanIcon />
                    Join Meeting
                </Button> */}
            {/* <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
        <Link href={`/call/${meetingId}`}>
          <VideoIcon/>
        </Link>
      
        Start Meeting
    </Button> */}

        </div>

        // </div>
    )

}