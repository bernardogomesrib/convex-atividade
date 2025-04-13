import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("messages").order("desc").take(50)).reverse();
  },
});

export const sendMessages = mutation({
  args: {
    usuario: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
        text: args.text,
        usuario: args.usuario,
        timestamp: Date.now(),
    });
  },
});