import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { orders } from "../../services/order.services";
import { OrderType, Context } from "../../types/types";

@Resolver()
export class OrderResolver {
  @Query(() => [OrderType])
  async getOrders(@Ctx() ctx: Context) {
    return await orders.getOrders(ctx);
  }

  @Mutation(() => String)
  async addOrderItem(
    @Arg("productId") productId: string,
    @Arg("quantity") quantity: number,
    @Ctx() ctx: Context
  ) {
    return await orders.addOrderItem({ productId, quantity }, ctx);
  }
  @Mutation(() => String)
  async removeOrderItem(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await orders.removeOrderItem({ id }, ctx);
  }
  @Mutation(() => String)
  async makeOrder(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await orders.makeOrder({ id }, ctx);
  }

  @Mutation(() => String)
  async deliverOrder(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await orders.delivered({ id }, ctx);
  }

  @Mutation(() => String)
  async cancelOrder(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await orders.cancelOrder({ id }, ctx);
  }

  @Mutation(() => String)
  async deleteOrder(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await orders.deleted({ id }, ctx);
  }
}
