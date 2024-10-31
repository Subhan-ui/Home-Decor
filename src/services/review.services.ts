import { GraphQLError } from "graphql";
import { Context, idType, productIdType, reviewType } from "../types/types";

export const reviews = {
  getReviews: async ({ productId }: productIdType, { prisma }: Context) => {
    return await prisma.review.findMany({
      where: { furnitureItemId: productId },
      include: {
        user: true,
        furnitureItem: true,
      },
    });
  },
  addReview: async (
    { productId, rating, comment }: reviewType,
    { prisma, me }: Context
  ) => {
    if (!me?.id) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }, 
        },
      });
    }
    try {
      await prisma.review.create({
        data: {
          userId: me?.id,
          furnitureItemId: productId,
          rating: rating,
          comment: comment,
        },
      });
      return "Review added successfully";
    } catch (error) {
      return "An error occured" + error;
    }
  },
  deleteReview: async ({ id }: idType, { prisma, me }: Context) => {
    if (!me?.id) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }, 
        },
      });
    }
    try {
      await prisma.review.delete({
        where: {
          id: id,
          userId: me?.id,
        },
      });
      return "Review deleted successfully";
    } catch (error) {
      return "An error occured" + error;
    }
  },
};
