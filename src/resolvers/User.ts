import { User } from "../../prisma/generated/type-graphql/models";
import { Context } from "../types/types";

export const Users = {
  getUsers: async (args: User, context: Context) => {
    return await context.prisma.user.findMany({
      include: {
        address: true,
        furnitureItem: {
          include: {
            category: true,
            subCategory: true,
          },
        },
        orders: {
          include: {
            items: {
              include: {
                furnitureItem: {
                  include: {
                    category: true,
                    subCategory: true,
                  },
                },
              },
            },
          },
        },
        cartItems: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
        favourites: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
        reviews: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      },
    });
  },
  getUser: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
    }
    let user = prisma.user.findFirst({
      where: { id: me.id },
      include: {
        address: true,
        furnitureItem: {
          include: {
            category: true,
            subCategory: true,
          },
        },
        orders: {
          include: {
            items: {
              include: {
                furnitureItem: {
                  include: {
                    category: true,
                    subCategory: true,
                  },
                },
              },
            },
          },
        },
        cartItems: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
        favourites: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
        reviews: {
          include: {
            furnitureItem: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
