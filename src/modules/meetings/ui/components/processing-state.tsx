
import { EmptyState } from "@/components/empty-state"




export const ProcessingState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                image="/processing.svg"
                title="Meeting Completed"
                description="This meeting was completed, a summary will appear soon"
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