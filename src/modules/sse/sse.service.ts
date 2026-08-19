import { Response } from "express";
import { UserRole } from "../auth/auth.types.js";

type SseClient = {
  res: Response;
  userId: number;
  role: UserRole;
};

class SseService {
  private clients = new Set<SseClient>();

  addClient(res: Response, userId: number, role: UserRole) {
    this.clients.add({
      res,
      userId,
      role,
    });
  }

  removeClient(res: Response) {
    for (const client of this.clients) {
      if (client.res === res) {
        this.clients.delete(client);
        break;
      }
    }
  }

  send(event: string, data: unknown) {
    const payload = `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;

    for (const client of this.clients) {
      client.res.write(payload, "utf8");
    }
  }
}

export const sseService = new SseService();
