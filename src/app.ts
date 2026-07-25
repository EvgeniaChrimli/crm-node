import express from "express";
import "dotenv/config";
import cors from "cors";
import { Pool } from "pg";
import { userRouter } from "./modules/users/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { branchRouter } from "./modules/branches/branch.routes.js";
import { contactRouter } from "./modules/contacts/contacts.router.js";
import { accessRouter } from "./modules/access/access.router.js";
import { meetingRoter } from "./modules/meetings/meetings.routes.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // если позже будете передавать куки/авторизацию
  }),
);
app.use(express.json());

// Шаг 5 —Подключаем в app.ts

app.use("/users", userRouter);
app.use("/branches", branchRouter);
app.use("/contacts", contactRouter);
app.use("/access", accessRouter);
app.use("/meeting", meetingRoter);

//ошибки в конце
app.use(errorMiddleware);
