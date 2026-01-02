import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon,
} from "lucide-react"

import { CommandSelect } from "@/components/command-select"
import { meetingStatus } from "@/database/schema"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { Value } from "@radix-ui/react-select"
import { useState } from "react"
import { MeetingStatus } from "../../types"


const options = [
    {
        id: meetingStatus.enumValues[0],
        value: meetingStatus.enumValues[0],
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.enumValues[0]}

            </div>
        )
    },
    {
        id: meetingStatus.enumValues[1],
        value: meetingStatus.enumValues[1],
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.enumValues[1]}

            </div>
        )
    },
    {
        id: meetingStatus.enumValues[2],
        value: meetingStatus.enumValues[2],
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.enumValues[2]}

            </div>
        )
    },
    {
        id: meetingStatus.enumValues[3],
        value: meetingStatus.enumValues[3],
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.enumValues[3]}

            </div>
        )
    },
    {
        id: meetingStatus.enumValues[4],
        value: meetingStatus.enumValues[4],
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {meetingStatus.enumValues[4]}

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
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            value={filters?.status ?? ""}
        />

    )
}