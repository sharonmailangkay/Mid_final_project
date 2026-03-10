import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * STUDENT MANAGEMENT LOGIC (CRUD)
 */

export const getStudents = query({
    handler: async (ctx) => {
        return await ctx.db.query("students").order("desc").collect();
    }
});

export const addStudent = mutation({
    args: {
        name: v.string(),
        nim: v.string(),
        major: v.string(),
        year: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("students", {
            name: args.name,
            nim: args.nim,
            major: args.major,
            year: args.year,
        });
    }
});

export const updateStudent = mutation({
    args: {
        id: v.id("students"),
        name: v.string(),
        nim: v.string(),
        major: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            name: args.name,
            nim: args.nim,
            major: args.major,
        });
    }
});

export const deleteStudent = mutation({
    args: { id: v.id("students") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
});

/**
 * PMB MANAGEMENT LOGIC
 */

export const getApplicants = query({
    handler: async (ctx) => {
        return await ctx.db.query("applicants").order("desc").collect();
    }
});

export const verifyApplicant = mutation({
    args: { id: v.id("applicants"), nim: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: "Verified",
            nim: args.nim,
        });
    }
});

/**
 * CONSULTATION MANAGEMENT LOGIC
 */

export const getConsultations = query({
    handler: async (ctx) => {
        return await ctx.db.query("consultations").order("desc").collect();
    }
});

export const assignConsultation = mutation({
    args: { id: v.id("consultations"), assignee: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: "Assigned",
            assignee: args.assignee,
        });
    }
});

export const completeConsultation = mutation({
    args: { id: v.id("consultations") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: "Completed",
        });
    }
});

/**
 * UTILITY: CLEAR ALL (Adapted from user's clearAllTodos)
 */
export const clearAllData = mutation({
    handler: async (ctx) => {
        const tables = ["students", "applicants", "consultations", "grades"] as const;
        for (const table of tables) {
            const records = await ctx.db.query(table).collect();
            for (const record of records) {
                await ctx.db.delete(record._id);
            }
        }
        return "All Admin data cleared.";
    },
});
