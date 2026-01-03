import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon,
} from "lucide-react"

import { CommandSelect } from "@/components/command-select"

import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { Value } from "@radix-ui/react-select"
import { useState } from "react"
import { meetingStatus } from "../../types"


const options = [
    {
        id: meetingStatus.Upcoming,
        value: meetingStatus.Upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.Upcoming}

            </div>
        )
    },
    {
        id: meetingStatus.Active,
        value: meetingStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon className="text-blue-500"/>
                {meetingStatus.Active}

            </div>
        )
    },
    {
        id: meetingStatus.Completed,
        value: meetingStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon className="text-green-500"/>
                {meetingStatus.Completed}

            </div>
        )
    },
    {
        id: meetingStatus.Processing,
        value: meetingStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon className="animate-spin text-green-800" />
                {meetingStatus.Processing}

            </div>
        )
    },
    {
        id: meetingStatus.Cancelled,
        value: meetingStatus.Cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon className="text-red-600" />
                {meetingStatus.Cancelled}

            </div>
        )
    }
]
export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    return (
        <CommandSelect
            placeholder="Status"
            className="h-9"
            options={options}  
            onSelect={(value) => setFilters({ status: value as meetingStatus })}
            value={filters?.status ?? ""}
        />

    )
}