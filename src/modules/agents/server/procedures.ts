import { db } from "@/database";
import { agents } from "@/database/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import {z} from "zod"
import { eq } from "drizzle-orm";

export const agentsRouter=createTRPCRouter({
    getOne:baseProcedure.input(z.object({id:z.string()})).query(async ({input} )=>{
        const [existingAgent]=await db.select().from(agents).where(eq(agents.id, input.id))
return existingAgent;
    }),
    getMany:baseProcedure.query(async()=>{
        const data=await db.select().from(agents);
        // await new Promise((resolve)=>setTimeout(resolve,3000))
        // throw new TRPCError({ code:"BAD_REQUEST"})
        return data;
    }),

    create:protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async({input, ctx})=>{
        const{name, instruction}=input
      const [createdAgent]=await db.insert(agents).values({
        name:name,
        instructions:instruction,
        userId:ctx.auth.user.id,
      })
      .returning();
      return createdAgent;
    })

    
});