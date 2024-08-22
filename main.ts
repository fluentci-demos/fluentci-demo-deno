import { Application } from "./deps.ts";
import router from "./src/routes/user.ts";

export const app = new Application();

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log("Server running on http://localhost:8000");
  await app.listen({ port: 8000 });
}
