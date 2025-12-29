"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView=()=>{
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return(
        <div>
            {JSON.stringify(data)}

        </div>
    )
}
export const MeetingViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few second.."
        />
    )

}
export const MeetingViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    )
}