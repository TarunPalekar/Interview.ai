import { MeetingView, MeetingViewError, MeetingViewLoading } from "@/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Page(){
    const queryClient=getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))
    return(
        <div>
            <HydrationBoundary>
                <Suspense fallback={<MeetingViewLoading/>}>
                    <ErrorBoundary fallback={<MeetingViewError/>}>
                        <MeetingView/>
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>

            
        </div>
    )
}