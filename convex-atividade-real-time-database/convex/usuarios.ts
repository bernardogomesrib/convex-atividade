import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const getUsuarios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("usuarios").collect();
  },
});

export const updateUsuario = mutation({
  args: {
    id: v.string(),
    digitando: v.boolean(),
  },
  handler: async (ctx, args) => {
    const usuario = await ctx.db.query("usuarios").filter(q => q.eq(q.field("id"), args.id)).first();
    if (!usuario) {
      await ctx.db.insert("usuarios", {
        id: args.id,
        digitando: args.digitando,
        ultimaAtividade: Date.now(),
      });
      return;
    }
    await ctx.db.patch(usuario._id, {
      digitando: args.digitando,
      ultimaAtividade: Date.now(),
    });
  },
});