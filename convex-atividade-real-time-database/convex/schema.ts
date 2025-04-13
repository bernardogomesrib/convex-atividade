import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    text: v.string(),
    usuario: v.string(),
    timestamp: v.number(),
  }),
  usuarios: defineTable({
    id: v.string(),
    ultimaAtividade: v.number(),
    digitando: v.boolean(),
  })
});

  

