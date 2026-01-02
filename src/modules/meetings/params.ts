
import { parseAsInteger, parseAsString,  createLoader,  } from "nuqs/server";
import { DEFAULT_PAGE } from "@/constant";
import { parseAsStringEnum } from "nuqs/server";
import { meetingStatus } from "@/database/schema";

export const filtersSearchParams={
    search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
    page:parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
    status:parseAsStringEnum(Object.values(meetingStatus)),
    agentId:parseAsString.withDefault("").withOptions({clearOnDefault:true}),


}
export const loadSearchParams=createLoader(filtersSearchParams)