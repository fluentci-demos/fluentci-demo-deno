import { Context } from "../../deps.ts";
import { createUser, getAllUsers } from "../models/user.ts";

export const getUsers = async (ctx: Context) => {
  const users = await getAllUsers();
  ctx.response.body = { users };
};

export const addUser = async (ctx: Context) => {
  const { name, email } = await ctx.request.body.json();
  const user = await createUser(name, email);
  ctx.response.status = 201;
  ctx.response.body = { user };
};
