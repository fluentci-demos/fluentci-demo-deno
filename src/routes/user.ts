import { Router } from "../../deps.ts";
import { getUsers, addUser } from "../controllers/user.ts";

const router = new Router();

// Define the route for getting all users
router.get("/users", getUsers);

// Define the route for adding a new user
router.post("/users", addUser);

export default router;
