import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { departmentsTable } from "./departments";
import { citiesTable } from "./cities";
import { categoriesTable } from "./categories";

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  departmentId: integer("department_id").references(() => departmentsTable.id, { onDelete: "set null" }),
  cityId: integer("city_id").references(() => citiesTable.id, { onDelete: "set null" }),
  categoryId: integer("category_id").references(() => categoriesTable.id, { onDelete: "set null" }),
  jobType: text("job_type").notNull().default("government"), // government | private
  employmentType: text("employment_type").notNull().default("full_time"), // full_time | part_time | contract
  description: text("description"),
  requirements: text("requirements"),
  howToApply: text("how_to_apply"),
  applyUrl: text("apply_url"),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  ageMin: integer("age_min"),
  ageMax: integer("age_max"),
  education: text("education"),
  experience: text("experience"),
  deadline: text("deadline"),
  isFeatured: boolean("is_featured").notNull().default(false),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertJobSchema = createInsertSchema(jobsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobsTable.$inferSelect;
