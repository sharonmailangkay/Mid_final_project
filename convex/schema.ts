import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    name: v.string(),
    nim: v.string(),
    major: v.string(),
    year: v.string(),
  }),
  applicants: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    status: v.string(), // 'Pending' or 'Verified'
    nim: v.optional(v.string()),
  }),
  consultations: defineTable({
    studentName: v.string(),
    topic: v.string(),
    date: v.string(),
    status: v.string(), // 'Pending', 'Assigned', 'Completed'
    message: v.string(),
    assignee: v.optional(v.string()),
  }),
  grades: defineTable({
    studentName: v.string(),
    nim: v.string(),
    course: v.string(),
    grade: v.string(),
  }),
  courses: defineTable({
    code: v.string(),
    name: v.string(),
    sks: v.string(),
    lecturer: v.string(),
  }),
});
