import {
  Arg,
  Ctx,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql";

import { FurnitureItem } from "../../../prisma/generated/type-graphql/models";
import { Categories } from "../../../prisma/generated/type-graphql/enums/Categories";

import { items } from "../../services/items.services";
import { Context, ItemResponse } from "../../types/types";

registerEnumType(Categories, {
  name: "Categories",
  description: "The available categories for items",
});
@Resolver()
export class ItemsResolver {
  @Query(() => [ItemResponse])
  async getItems(@Ctx() ctx: Context) {
    return await items.getItems(ctx);
  }
  @Query(() => [ItemResponse])
  async getMyItems(@Ctx() ctx: Context) {
    return await items.getMyItem(ctx);
  }
  @Mutation(() => FurnitureItem)
  async addItem(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("picture") picture: string,
    @Arg("category", () => Categories) category: Categories,
    @Arg("subCategory") subCategory: string,
    @Ctx() ctx: Context
  ) {
    return await items.addItem(
      { name, description, price, picture, category, subCategory },
      ctx
    );
  }
}
