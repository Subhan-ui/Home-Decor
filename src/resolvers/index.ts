import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./Mutations/auth";

const resolvers: NonEmptyArray<Function> = [
  AuthResolver,
  
];

export default resolvers;
