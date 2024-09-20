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
    if (!me) {
      return "You need to login";
    }
    try {
      await prisma.review.create({
        data: {
          userId: me.id,
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
    if (!me) {
      return "You need to login";
    }
    try {
      await prisma.review.delete({
        where: {
          id: id,
          userId: me.id,
        },
      });
      return "Review deleted successfully";
    } catch (error) {
      return "An error occured" + error;
    }
  },
};
