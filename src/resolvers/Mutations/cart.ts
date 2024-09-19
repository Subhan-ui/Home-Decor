import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { CartItemType, Context } from "../../types/types";
import { CartItem } from "../../../prisma/generated/type-graphql/models";
import { carts } from "../../services/cart.services";

@Resolver()
export class CartResolver {
  @Query(() => [CartItemType])
  async getCartItems(@Ctx() ctx: Context) {
    return await carts.getCartItems(ctx);
  }
  @Mutation(()=>CartItem)
  async addItemToCart(
    @Arg("id") id:string,
    @Arg("quantity") quantity:number,
    @Ctx() ctx:Context
  ) {
    return await carts.addItemToCart({id,quantity}, ctx)
  }

  @Mutation(()=>String)
  async removeCartItem(
    @Arg("id") id:string,
    @Ctx() ctx:Context
  ) {
    return await carts.removeItemFromCart({id}, ctx)
  }

  @Mutation(()=>String)
  async addSingleItem(
    @Arg('cartId') cartId:string,
    @Ctx() ctx:Context,
  ) {
    return await carts.addSingleItem({cartId}, ctx)
  }

  @Mutation(()=>String)
  async removeSingleItem(
    @Arg('cartId') cartId:string,
    @Ctx() ctx:Context
  ) {
    return await carts.removeSingleItem({cartId}, ctx)
  }
}
