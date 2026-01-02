
import { MeetingListHeader } from "@/modules/meetings/ui/components/meeting-list-header";
import { MeetingView, MeetingViewError, MeetingViewLoading } from "@/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { loadSearchParams } from "@/modules/meetings/params";
import type { SearchParams } from "nuqs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
interface Props{
    searchParams:Promise<SearchParams>
}

const Page= async({searchParams}:Props)=>{
    const filters= await loadSearchParams(searchParams);
    const session=await auth.api.getSession({
        headers:await headers(),
    })
    if(!session){
        redirect("/sign-in")
    }
    const queryClient=getQueryClient();
void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
    
 
 
}))
    return(
        <>
           <MeetingListHeader/>
            <HydrationBoundary>
                <Suspense fallback={<MeetingViewLoading/>}>
                    <ErrorBoundary fallback={<MeetingViewError/>}>
                        <MeetingView/>
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>

            
        </>
    )
}
export default Page