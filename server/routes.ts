import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // This app doesn't need any backend routes as all functionality
  // is handled on the client side

  const httpServer = createServer(app);
  return httpServer;
}
