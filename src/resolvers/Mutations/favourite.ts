import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { FavouriteType, Context } from "../../types/types";
import { favourites } from "../../services/favourite.services";

@Resolver()
export class FavouriteResolver {
  @Query(() => [FavouriteType])
  async getUserFavourites(@Ctx() ctx: Context) {
    return await favourites.getUserFavourite(ctx);
  }

  @Query(()=>[FavouriteType])
  async getItemFavourites(@Arg("itemId") itemId:string, @Ctx() ctx: Context) {
    return await favourites.getItemFavourites({ itemId }, ctx);
  }

  @Mutation(() => String)
  async addToFavourites(@Arg("itemId") itemId: string, @Ctx() ctx: Context) {
    return await favourites.addToFavourite({ itemId }, ctx);
  }

  @Mutation(()=>String)
  async removeFromFavourites(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await favourites.removeFavourite({ id }, ctx);
  }
}
