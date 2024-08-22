import { app } from "../../main.ts";
import { assertEquals, superoak } from "../../deps.ts";
import client from "../../database.ts";
import router from "../../src/routes/user.ts";

app.use(router.routes());
app.use(router.allowedMethods());

Deno.test("Setup: Clean up users table before each test", async () => {
  await client.queryArray("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

Deno.test("GET /users returns list of users", async () => {
  const request = await superoak(app);
  await request
    .get("/users")
    .expect(200)
    .expect((res) => {
      assertEquals(Array.isArray(res.body.users), true);
    });
});

Deno.test("POST /users adds a new user", async () => {
  const request = await superoak(app);
  await request
    .post("/users")
    .send({ name: "New User", email: "newuser@example.com" })
    .expect(201)
    .expect((res) => {
      assertEquals(res.body.user.name, "New User");
      assertEquals(res.body.user.email, "newuser@example.com");
    });
});
