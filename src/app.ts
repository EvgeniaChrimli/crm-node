import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Pool } from "pg";
import { userRouter } from "./modules/users/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { branchRouter } from "./modules/branches/branch.routes.js";
import { contactRouter } from "./modules/contacts/contacts.router.js";
import { accessRouter } from "./modules/access/access.router.js";
import { meetingRoter } from "./modules/meetings/meetings.routes.js";
import { sseRouter } from "./modules/sse/sse.router.js";
import { authRouter } from "./modules/auth/auth.router.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/branches", branchRouter);
app.use("/contacts", contactRouter);
app.use("/access", accessRouter);
app.use("/meeting", meetingRoter);
app.use("/sse", sseRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);
