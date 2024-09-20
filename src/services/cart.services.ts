import { Context } from "../types/types";

export const carts = {
  getCartItems: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
    }
    return await prisma.cartItem.findMany({
      where: { userId: me.id },
      include: {
        furnitureItem: true,
      },
    });
  },
  addItemToCart: async (
    { id, quantity }: { id: string; quantity: number },
    { me, prisma }: Context
  ) => {
    if (!me) {
      throw new Error("You need to login");
    }
    const cartItem = await prisma.cartItem.findFirst({
      where: { furnitureItemId: id, userId: me.id },
    });
    if (!cartItem) {
      return await prisma.cartItem.create({
        data: {
          quantity: quantity,
          furnitureItemId: id,
          userId: me.id,
        },
      });
    }
    return await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: quantity + cartItem.quantity,
      },
    });
  },
  removeItemFromCart: async (
    { id }: { id: string },
    { prisma, me }: Context
  ) => {
    if (!me) {
      return "You need to login";
    }
    try {
      await prisma.cartItem.delete({
        where: { id },
        include: {
          furnitureItem: true,
        },
      });
      return "Item is remove from the cart";
    } catch (error) {
      return "An error occured";
    }
  },
  addSingleItem: async (
    { cartId: id }: { cartId: string },
    { prisma, me }: Context
  ) => {
    if (!me) {
      return "You need to login";
    }
    try {
      const cartItem = await prisma.cartItem.findFirst({
        where: { id: id, userId: me.id },
      });
      if (!cartItem) {
        return "Item not found";
      }
      const updatedCart = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });
      return `${updatedCart.quantity} items is added to the cart`;
    } catch (error) {
      return "An error occured";
    }
  },
  removeSingleItem: async (
    { cartId: id }: { cartId: string },
    { prisma, me }: Context
  ) => {
    if (!me) {
      return "You need to login";
    }
    try {
      const cartItem = await prisma.cartItem.findFirst({
        where: { id: id, userId: me.id },
      });
      if (!cartItem) {
        return "Item not found";
      }
      if (cartItem.quantity === 1) {
        await prisma.cartItem.delete({
          where: { id: cartItem.id },
        });
        return "Item is remove from the cart";
      }
      const updatedCart = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity: cartItem.quantity - 1,
        },
      });
      return `${updatedCart.quantity} items is left in the cart`;
    } catch (error) {
      return "An error occured";
    }
  },
};
