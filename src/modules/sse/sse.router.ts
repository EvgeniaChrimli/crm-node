import { Router } from "express";
import { subscribeController } from "./sse.controller.js";

export const sseRouter = Router();
sseRouter.get("/", authMiddleware, subscribeController);
