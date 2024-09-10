import { buildSchema } from "type-graphql";
import { AuthResolver as resolvers } from "./resolvers";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [resolvers],
    validate: false,
  });
};
