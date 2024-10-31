import { GraphQLError } from "graphql";
import { Context, idType, itemIdType } from "../types/types";

export const favourites = {
  getUserFavourite: async ({ prisma, me }: Context) => {
    if (!me?.id) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }, 
        },
      });
    }
    return await prisma.favourite.findMany({
      where: { userId: me?.id },
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
    if (!me?.id) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }, 
        },
      });
    }
    const existItem = await prisma.favourite.findFirst({
      where: { userId: me?.id, furnitureItemId: itemId },
    });
    if (existItem) {
      return "Item is already in your favourites";
    }

    await prisma.favourite.create({
      data: {
        userId: me?.id,
        furnitureItemId: itemId,
      },
    });
    return "Item added to favourites";
  },
  removeFavourite: async ({ id }: idType, { prisma, me }: Context) => {
    if (!me?.id) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }, 
        },
      });
    }
    await prisma.favourite.delete({
      where: { id: id },
    });
    return "Item removed from favourites";
  },
};
