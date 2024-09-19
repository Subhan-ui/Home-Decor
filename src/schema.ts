import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: resolvers,
    validate: false,
  });
};
