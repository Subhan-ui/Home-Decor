import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./Mutations/auth";
import { AddressResolver } from "./Mutations/address";
import { ItemsResolver } from "./Mutations/items";
import { CartResolver } from "./Mutations/cart";
import { FavouriteResolver } from "./Mutations/favourite";
import { ReviewResolver } from "./Mutations/review";
import { OrderResolver } from "./Mutations/order";

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
