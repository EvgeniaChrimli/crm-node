import readline from "node:readline";
import {
  createUser,
  findUserByEmail,
} from "../modules/users/user.repository.js";
import { hashPassword } from "../modules/auth/model/lib/hash.js";
import { UserRole } from "../modules/auth/auth.types.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};

const createAdmin = async () => {
  try {
    console.log("\n=== Create administrator ===\n");

    const name = (await question("Name: ")).trim();
    const email = (await question("Email: ")).trim().toLowerCase();
    const password = await question("Password: ");

    if (!name || name.length < 2) {
      throw new Error("Name must contain at least 2 characters");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password || password.length < 8) {
      throw new Error("Password must contain at least 8 characters");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    const password_hash = await hashPassword(password);

    const admin = await createUser({
      name,
      email,
      password_hash,
      role: UserRole.ADMIN,
    });

    console.log("\nAdministrator successfully created.");
    console.log(`ID: ${admin.id}`);
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
  } catch (error) {
    console.error(
      "\nFailed to create administrator:",
      error instanceof Error ? error.message : error,
    );

    process.exitCode = 1;
  } finally {
    rl.close();
  }
};

createAdmin();
