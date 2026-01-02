import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import { meetingStatus } from "@/database/schema";

export type MeetingGetOne=inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingGetMany=inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"][number];
export type MeetingStatus =
  (typeof meetingStatus.enumValues)[number]