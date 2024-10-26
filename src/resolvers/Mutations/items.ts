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
import {
  CategoryType,
  Context,
  ItemResponse,
  SubCategoryType,
} from "../../types/types";

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
  @Query(() => [ItemResponse])
  async getCategoryItems(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await items.getCategoryItems({ id }, ctx);
  }

  @Query(() => [ItemResponse])
  async searchItems(@Arg("term") term: string, @Ctx() ctx: Context) {
    return await items.searchItems({ searchTerm: term }, ctx);
  }
  @Query(() => [ItemResponse])
  async newCollection(@Ctx() ctx: Context) {
    return await items.newCollection(ctx);
  }
  @Query(() => [ItemResponse])
  async popularItems(@Ctx() ctx: Context) {
    return await items.popularItems(ctx);
  }

  @Query(() => [ItemResponse])
  async getSubItems(
    @Arg("categoryId") categoryId: string,
    @Arg("subCategoryId") subCategoryId: string,
    @Ctx() ctx: Context
  ) {
    return await items.findSubItems({ categoryId, subCategoryId }, ctx);
  }

  @Query(() => [CategoryType])
  async getCategories(@Ctx() ctx: Context) {
    return await items.getCategories(ctx);
  }

  @Query(() => [SubCategoryType])
  @Mutation(() => String)
  async addSubCategories(
    @Arg("subCategory") subCategory: string,
    @Arg("categoryId") categoryId: string,
    @Ctx() ctx: Context
  ) {
    return await items.addSub({ subCategory, categoryId }, ctx);
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
