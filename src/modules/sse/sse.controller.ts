import { Request, Response } from "express";
import { sseService } from "./sse.service.js";

export const subscribeController = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");

  res.setHeader("Cache-Control", "no-cache");

  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  sseService.addClient(res, req.user!.userId, req.user!.role);

  req.on("close", () => {
    sseService.removeClient(res);
  });
};
