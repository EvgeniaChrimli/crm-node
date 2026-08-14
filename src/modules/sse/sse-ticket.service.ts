import { createHash, randomBytes } from "node:crypto";
import { UserRole } from "../auth/auth.types.js";

type sseTicket = {
  userId: number;
  expiresAt: number;
  role: UserRole;
};

const TICKET_TTL = 3 * 1000;
const tickets = new Map<string, sseTicket>();

const hashTicket = (ticket: string): string => {
  return createHash("sha256").update(ticket).digest("hex");
};

export const createSseTicket = (userId: number, role: UserRole): string => {
  const ticket = randomBytes(32).toString("hex");

  const ticketHash = hashTicket(ticket);

  tickets.set(ticketHash, { userId, role, expiresAt: Date.now() + TICKET_TTL });

  return ticket;
};

export const consumeSseTicket = (ticket: string): sseTicket | null => {
  const ticketHash = hashTicket(ticket);
  const storedTicket = tickets.get(ticketHash);

  if (!storedTicket) {
    return null;
  }

  tickets.delete(ticketHash);

  if (storedTicket.expiresAt < Date.now()) {
    return null;
  }

  return storedTicket;
};
