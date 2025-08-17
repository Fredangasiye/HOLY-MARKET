import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  culturalGroup: text("cultural_group").notNull(),
  education: text("education").notNull(),
  employment: text("employment").notNull(),
  familyType: text("family_type"),
  location: text("location"),
  income: text("income"),
  age: text("age"),
  socialStanding: text("social_standing"),
  numberOfChildren: text("number_of_children"),
  virginityStatus: text("virginity_status"),
  result: text("result").notNull(),
  breakdown: text("breakdown").notNull(), // JSON string
  createdAt: text("created_at").notNull(),
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  createdAt: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;

// Form validation schemas
export const calculatorFormSchema = z.object({
  culturalGroup: z.string().min(1, "Please select your cultural group"),
  education: z.string().min(1, "Please select your education level"),
  employment: z.string().min(1, "Please select your employment status"),
  familyType: z.string().optional(),
  location: z.string().optional(),
  income: z.string().optional(),
  age: z.string().optional(),
  socialStanding: z.string().optional(),
  numberOfChildren: z.string().optional(),
  virginityStatus: z.string().optional(),
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;

export interface CalculationResult {
  amount: string;
  breakdown: {
    base: number;
    education: number;
    career: number;
    location: number;
    total: {
      lower: number;
      upper: number;
    };
  };
  cowEquivalent: {
    lowerCows: number;
    upperCows: number;
    pricePerCow: number;
    displayText: string;
  };
  insights: {
    title: string;
    description: string;
    culturalNotes: string[];
    negotiationTips: string[];
  };
}
