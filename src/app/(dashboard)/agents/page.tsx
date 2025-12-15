import { AgentView, AgentViewError, AgentViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"

const Page=()=>{
    const queryClient=getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading/>}>
            <ErrorBoundary fallback={<AgentViewError/>}>
                <AgentView/>
            </ErrorBoundary> 
        </Suspense>
       
    </HydrationBoundary>
  )
}
export default Page