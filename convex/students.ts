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
    args: { studentName: v.string(), topic: v.string(), date: v.string(), message: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("consultations", {
            studentName: args.studentName,
            topic: args.topic,
            date: args.date,
            message: args.message,
            status: "Pending",
        });
    }
});

// Submit a new applicant (Sharon's registration side)
export const addApplicant = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("applicants", {
            name: args.name,
            email: args.email,
            phone: args.phone,
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
// Get applicant details (to track verification status)
export const getApplicantById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        try {
            const applicantId = ctx.db.normalizeId("applicants", args.id);
            if (!applicantId) return null;
            return await ctx.db.get(applicantId);
        } catch (e) {
            return null;
        }
    }
});
