import { User } from "../../prisma/generated/type-graphql/models";
import { Context } from "../types/types";

export const Users = {
  getUsers: async (args: User, context: Context) => {
    return await context.prisma.user.findMany();
  },
};
