import express from "express";
import { userRouter } from "./modules/users/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();
app.use(express.json());

// Шаг 5 —Подключаем в app.ts

app.use("/users", userRouter);

//ошибки в конце
app.use(errorMiddleware);
