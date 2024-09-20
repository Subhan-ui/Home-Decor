import { NonEmptyArray } from "type-graphql";

import {
  AuthResolver,
  AddressResolver,
  ItemsResolver,
  CartResolver,
  FavouriteResolver,
  ReviewResolver,
  OrderResolver,
} from "./Mutations";

const resolvers: NonEmptyArray<Function> = [
  AuthResolver,
  AddressResolver,
  ItemsResolver,
  CartResolver,
  FavouriteResolver,
  ReviewResolver,
  OrderResolver,
];

export default resolvers;
