import { GraphQLError } from "graphql";
import { uploadingImage } from "../lib/cloudinary";
import { Context, idType, itemType } from "../types/types";

export const items = {
  getItems: async ({ prisma }: Context) => {
    return await prisma.furnitureItem.findMany({
      include: { user: true, category: true, subCategory: true },
    });
  },
  getCategoryItems: async ({ id }: idType, { prisma }: Context) => {
    const items = await prisma.furnitureItem.findMany({
      where: { categoryId: id },
      include: {
        category: true,
        subCategory: true,
      },
    });
    if (!items) {
      throw new Error("No items found");
    }
    return items;
  },
  getMyItem: async ({ prisma, me }: Context) => {
    if (!me?.id) {
      throw new GraphQLError("User not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    if (me.role === "USER") {
      throw new Error("Only admins can see and add items");
    }
    const items = await prisma.furnitureItem.findMany({
      where: {
        userId: me.id,
      },
    });
    if (!items) {
      throw new Error("No items found");
    }
    return items;
  },
  getCategories: async ({ prisma }: Context) => {
    const categories = await prisma.category.findMany({
      include: { subCategories: true },
    });
    return categories;
  },
  addSub: async (
    { subCategory, categoryId }: { subCategory: string; categoryId: string },
    { prisma }: Context
  ) => {
    const existSub = await prisma.subCategory.findFirst({
      where: {
        name: subCategory,
        categoryId: categoryId,
      },
    });
    if (existSub) {
      return "Already exist";
    }
    await prisma.subCategory.create({
      data: {
        name: subCategory,
        categoryId: categoryId,
      },
    });
    return "Added Successfully";
  },
  addItem: async (
    { name, description, price, picture, category, subCategory }: itemType,
    { me, prisma }: Context
  ) => {
    if (!me?.id) {
      throw new GraphQLError("User not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    if (me.role === "USER") {
      throw new Error("Only admins can add items");
    }
    const existCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
      select: {
        id: true,
      },
    });
    const existSubCategory = await prisma.subCategory.findFirst({
      where: {
        categoryId: existCategory?.id,
        name: subCategory,
      },
    });
    if (!picture) {
      throw new Error("Picture is compulsory");
    }
    const photo = await uploadingImage(picture);
    if (!existCategory?.id) {
      throw new Error("Category not found");
    }
    if (!existSubCategory?.id) {
      const newSubCategory = await prisma.subCategory.create({
        data: {
          name: subCategory,
          categoryId: existCategory.id,
        },
        select: { id: true },
      });
      const newItem = await prisma.furnitureItem.create({
        data: {
          userId: me.id,
          name,
          description,
          price,
          picture: photo.secure_url,
          categoryId: existCategory.id,
          subCategoryId: newSubCategory.id,
        },
      });
      return newItem;
    }
    const item = await prisma.furnitureItem.create({
      data: {
        userId: me.id,
        name,
        description,
        price,
        picture: photo.secure_url,
        categoryId: existCategory.id,
        subCategoryId: existSubCategory.id,
      },
    });
    return item;
  },
  searchItems: async (
    { searchTerm }: { searchTerm: string },
    { prisma }: Context
  ) => {
    const items = await prisma.furnitureItem.findMany({
      include: { user: true, category: true, subCategory: true },
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
          {
            subCategory: {
              name: { contains: searchTerm, mode: "insensitive" },
            },
          },
        ],
      },
    });

    if (!items.length) {
      throw new Error("No items found");
    }
    return items;
  },
  newCollection: async ({ prisma }: Context) => {
    return await prisma.furnitureItem.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  },
  popularItems: async ({ prisma }: Context) => {
    return await prisma.furnitureItem.findMany({
      include: {
        category: true,
        subCategory: true,
      },
      where: {
        furnitureItem: {
          some: {},
        },
      },
      orderBy: {
        furnitureItem: {
          _count: "desc",
        },
      },
      take: 10,
    });
  },
  findSubItems: async (
    {
      categoryId,
      subCategoryId,
    }: { categoryId: string; subCategoryId: string },
    { prisma }: Context
  ) => {
    return await prisma.furnitureItem.findMany({
      where: { categoryId, subCategoryId },
      include: { category: true, subCategory: true },
    });
  },
};
