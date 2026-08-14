import { Router } from "express";
import { subscribeController } from "./sse.controller.js";
import { sseAuthMiddleware } from "../../middlewares/sse.midleware.js";

export const sseRouter = Router();
sseRouter.get("/", sseAuthMiddleware, subscribeController);
