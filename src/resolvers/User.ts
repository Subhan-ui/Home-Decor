import { User } from "../../prisma/generated/type-graphql/models";
import { Context } from "../types/types";

export const Users = {
  getUsers: async (args: User, context: Context) => {
    return await context.prisma.user.findMany();
  },
  getUser: async ({ email }: { email: string }, context: Context) => {
    const user = context.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
