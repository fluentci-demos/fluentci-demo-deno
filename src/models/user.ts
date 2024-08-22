import client from "../../database.ts";

export interface User {
  id: number;
  name: string;
  email: string;
}

export async function createUser(name: string, email: string): Promise<User> {
  const result =
    await client.queryObject<User>`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING id, name, email`;
  return result.rows[0];
}

export async function getAllUsers(): Promise<User[]> {
  const result = await client.queryObject<User>`SELECT * FROM users`;
  return result.rows;
}
