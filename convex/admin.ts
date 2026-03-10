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
 * GRADE MANAGEMENT LOGIC
 */

export const getGrades = query({
    handler: async (ctx) => {
        return await ctx.db.query("grades").order("desc").collect();
    }
});

export const upsertGrade = mutation({
    args: {
        studentName: v.string(),
        nim: v.string(),
        course: v.string(),
        grade: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if grade already exists for this student and course
        const existing = await ctx.db
            .query("grades")
            .filter((q) => 
                q.and(
                    q.eq(q.field("nim"), args.nim),
                    q.eq(q.field("course"), args.course)
                )
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, { grade: args.grade });
            return existing._id;
        } else {
            return await ctx.db.insert("grades", {
                studentName: args.studentName,
                nim: args.nim,
                course: args.course,
                grade: args.grade,
            });
        }
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
