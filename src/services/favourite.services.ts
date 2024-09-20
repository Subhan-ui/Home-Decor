import { Context, idType, itemIdType } from "../types/types";

export const favourites = {
  getUserFavourite: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
    }
    return await prisma.favourite.findMany({
      where: { userId: me.id },
      include: {
        furnitureItem: true,
        user: true,
      },
    });
  },
  getItemFavourites: async ({ itemId }: itemIdType, { prisma }: Context) => {
    return await prisma.favourite.findMany({
      where: { furnitureItemId: itemId },
      include: {
        furnitureItem: true,
        user: true,
      },
    });
  },
  addToFavourite: async ({ itemId }: itemIdType, { prisma, me }: Context) => {
    if (!me) {
      return "You need to login";
    }
    const existItem = await prisma.favourite.findFirst({
      where: { userId: me.id, furnitureItemId: itemId },
    });
    if (existItem) {
      return "Item is already in your favourites";
    }

    await prisma.favourite.create({
      data: {
        userId: me.id,
        furnitureItemId: itemId,
      },
    });
    return "Item added to favourites";
  },
  removeFavourite: async ({ id }: idType, { prisma, me }: Context) => {
    if (!me) {
      return "YOu need to login";
    }
    await prisma.favourite.delete({
      where: { id: id },
    });
    return "Item removed from favourites";
  },
};
