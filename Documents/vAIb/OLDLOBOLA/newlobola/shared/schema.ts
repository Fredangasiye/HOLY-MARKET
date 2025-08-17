import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - base user information
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Supabase auth user ID
  email: text("email").notNull().unique(),
  role: text("role").notNull().default('player'), // 'player', 'scout', 'admin', 'parent'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Player profiles
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  age: integer("age").notNull(),
  location: text("location").notNull(),
  position: text("position").notNull(), // 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'
  preferredFoot: text("preferred_foot").notNull(), // 'Left', 'Right', 'Both'
  height: integer("height"), // in cm
  weight: integer("weight"), // in kg
  bio: text("bio"),
  profilePicture: text("profile_picture"),
  isVerified: boolean("is_verified").default(false).notNull(),
  parentConsent: boolean("parent_consent").default(false).notNull(),
  parentEmail: text("parent_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Scout profiles
export const scouts = pgTable("scouts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  organization: text("organization").notNull(),
  position: text("position").notNull(),
  credentials: text("credentials"),
  isVerified: boolean("is_verified").default(false).notNull(),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Video uploads
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").references(() => players.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: integer("duration"), // in seconds
  fileSize: integer("file_size"), // in bytes
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Evaluation packages
export const evaluationPackages = pgTable("evaluation_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // 'Starter', 'Pro', 'Elite'
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents (ZAR)
  features: jsonb("features").notNull(), // Array of features
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Player evaluations
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").references(() => players.id).notNull(),
  scoutId: integer("scout_id").references(() => scouts.id),
  packageId: integer("package_id").references(() => evaluationPackages.id).notNull(),
  videoId: integer("video_id").references(() => videos.id),
  
  // Technical attributes (1-10 scale)
  technicalScore: real("technical_score"),
  dribbling: integer("dribbling"),
  passing: integer("passing"),
  shooting: integer("shooting"),
  firstTouch: integer("first_touch"),
  
  // Tactical attributes
  tacticalScore: real("tactical_score"),
  positioning: integer("positioning"),
  decisionMaking: integer("decision_making"),
  gameIntelligence: integer("game_intelligence"),
  
  // Physical attributes
  physicalScore: real("physical_score"),
  speed: integer("speed"),
  strength: integer("strength"),
  stamina: integer("stamina"),
  agility: integer("agility"),
  
  // Mental attributes
  mentalScore: real("mental_score"),
  leadership: integer("leadership"),
  workRate: integer("work_rate"),
  confidence: integer("confidence"),
  
  // Overall assessment
  overallScore: real("overall_score"),
  writtenFeedback: text("written_feedback"),
  recommendations: text("recommendations"),
  aiAnalysis: jsonb("ai_analysis"), // For Elite package
  
  status: text("status").default('pending').notNull(), // 'pending', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: text("location").notNull(),
  contactInfo: text("contact_info"),
  registrationLink: text("registration_link"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Drills & Skills content
export const trainingContent = pgTable("training_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  category: text("category").notNull(), // 'Technical', 'Tactical', 'Physical', 'Mental'
  difficulty: text("difficulty").notNull(), // 'Beginner', 'Intermediate', 'Advanced'
  duration: integer("duration"), // in minutes
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
  packageId: integer("package_id").references(() => evaluationPackages.id).notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").default('ZAR').notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentReference: text("payment_reference").notNull(),
  status: text("status").default('pending').notNull(), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Monthly rankings
export const monthlyRankings = pgTable("monthly_rankings", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").references(() => players.id).notNull(),
  month: text("month").notNull(), // Format: 'YYYY-MM'
  averageScore: real("average_score").notNull(),
  totalEvaluations: integer("total_evaluations").notNull(),
  rank: integer("rank").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Scout access control
export const scoutAccessTokens = pgTable("scout_access_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  scoutId: integer("scout_id").references(() => scouts.id).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Video evaluation assignments
export const videoEvaluations = pgTable("video_evaluations", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").references(() => videos.id).notNull(),
  scoutId: integer("scout_id").references(() => scouts.id).notNull(),
  status: text("status").default("assigned").notNull(), // assigned, in_progress, completed
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScoutSchema = createInsertSchema(scouts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertMonthlyRankingSchema = createInsertSchema(monthlyRankings).omit({
  id: true,
  createdAt: true,
});

export const insertScoutAccessTokenSchema = createInsertSchema(scoutAccessTokens).omit({
  id: true,
  createdAt: true,
});

export const insertVideoEvaluationSchema = createInsertSchema(videoEvaluations).omit({
  id: true,
  assignedAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type Player = typeof players.$inferSelect;
export type Scout = typeof scouts.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type Evaluation = typeof evaluations.$inferSelect;
export type Event = typeof events.$inferSelect;
export type TrainingContent = typeof trainingContent.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type MonthlyRanking = typeof monthlyRankings.$inferSelect;
export type ScoutAccessToken = typeof scoutAccessTokens.$inferSelect;
export type VideoEvaluation = typeof videoEvaluations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type InsertScout = z.infer<typeof insertScoutSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

// Form validation schemas
export const playerProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  location: z.string().min(1, "Location is required"),
  position: z.string().min(1, "Position is required"),
  preferredFoot: z.string().min(1, "Preferred foot is required"),
  height: z.number().optional(),
  weight: z.number().optional(),
  bio: z.string().optional(),
  parentEmail: z.string().email().optional(),
});

export const scoutProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organization: z.string().min(1, "Organization is required"),
  position: z.string().min(1, "Position is required"),
  credentials: z.string().optional(),
});

export const videoUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export type PlayerProfileData = z.infer<typeof playerProfileSchema>;
export type ScoutProfileData = z.infer<typeof scoutProfileSchema>;
export type VideoUploadData = z.infer<typeof videoUploadSchema>;