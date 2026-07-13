import express from "express";
import "dotenv/config";
import cors from "cors";
import { Pool } from "pg";
import { userRouter } from "./modules/users/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { branchRouter } from "./modules/branches/branch.routes.js";

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

//ошибки в конце
app.use(errorMiddleware);

// Фронтенд — указываете адрес бэка
// # .env.local в корне frontend-проекта (Vite)
// VITE_API_URL=http://localhost:5000

// Запуск всего вместе
// # терминал 1 — из backend-репозитория
// docker compose up -d db     # только БД в контейнере
// npm run dev                  # сам Express локально

// # терминал 2 — из frontend-репозитория
// npm run dev                  # Vite на :5173
