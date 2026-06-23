import { app } from "./app.js";
import { db } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await db.query("SELECT NOW()");

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
start();
