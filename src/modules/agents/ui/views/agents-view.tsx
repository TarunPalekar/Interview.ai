"use client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"

export const AgentView=()=>{
    const trpc=useTRPC();
    const{data}=useSuspenseQuery(trpc.agents.getMany.queryOptions());
   return(
    <div>
     {JSON.stringify(data, null, 2)}
    </div>
   )
}
export const AgentViewLoading=()=>{
    return(
        <LoadingState
        title="Loading Agents"
        description="This may take a few second.."
        />
    )

}
export const AgentViewError=()=>{
    return(
        <ErrorState
        title="Error Loading Agents"
        description="Something went wrong"
        />
    )
}