import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculatorFormSchema } from "@shared/schema";
import { calculateLobola } from "../client/src/lib/calculator";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/calculate", async (req, res) => {
    try {
      // Validate request body
      const validatedData = calculatorFormSchema.parse(req.body);
      
      // Calculate lobola using our algorithm
      const results = calculateLobola(validatedData);
      
      // Store calculation for analytics (optional)
      try {
        await storage.createCalculation({
          ...validatedData,
          result: results.amount,
          breakdown: JSON.stringify(results.breakdown),
        });
      } catch (storageError) {
        // Log storage error but don't fail the request
        console.error("Failed to store calculation:", storageError);
      }
      
      res.json(results);
    } catch (error) {
      console.error("Calculation error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid calculation data" 
      });
    }
  });

  app.get("/api/calculations/stats", async (req, res) => {
    try {
      const stats = await storage.getCalculationStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ message: "Failed to retrieve statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
