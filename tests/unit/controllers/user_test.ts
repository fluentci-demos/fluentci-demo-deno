import client from "../../../database.ts";
import { assertEquals } from "../../../deps.ts";
import { createUser, getAllUsers } from "../../../src/models/user.ts";

Deno.test("Setup: Clean up users table before each test", async () => {
  await client.queryArray("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

Deno.test("createUser adds a new user", async () => {
  const user = await createUser("John Doe", "john@example.com");
  assertEquals(user.name, "John Doe");
  assertEquals(user.email, "john@example.com");
});

Deno.test("getAllUsers retrieves all users", async () => {
  await createUser("Jane Doe", "jane@example.com");
  const users = await getAllUsers();
  assertEquals(users.length, 2); // Adjust this based on the number of test cases.
});
