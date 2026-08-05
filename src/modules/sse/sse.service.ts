import { Response } from "express";

class SseService {
  private clients = new Set<Response>();

  addClient(res: Response) {
    this.clients.add(res);
  }

  removeClient(res: Response) {
    this.clients.delete(res);
  }

  send(event: string, data: unknown) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;

    for (const client of this.clients) {
      client.write(payload, "utf8");
    }
  }
}

export const sseService = new SseService();
