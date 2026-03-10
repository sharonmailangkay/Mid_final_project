import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * STUDENT PORTAL QUERIES (For Sharon & Jiba)
 */

// Get grades for a specific student (by NIM)
export const getMyGrades = query({
    args: { nim: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("grades")
            .filter((q) => q.eq(q.field("nim"), args.nim))
            .collect();
    }
});

// Get consultations for a specific student
export const getMyConsultations = query({
    args: { studentName: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("consultations")
            .filter((q) => q.eq(q.field("studentName"), args.studentName))
            .collect();
    }
});

// Submit a new consultation request (Jiba's side writes to your admin panel)
export const requestConsultation = mutation({
    args: {
        studentName: v.string(),
        topic: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("consultations", {
            studentName: args.studentName,
            topic: args.topic,
            date: args.date,
            status: "Pending",
        });
    }
});

// Get basic profile info (Sharon's side)
export const getStudentProfile = query({
    args: { nim: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("students")
            .filter((q) => q.eq(q.field("nim"), args.nim))
            .unique();
    }
});
