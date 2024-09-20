import { uploadingImage } from "../lib/cloudinary";
import { Context, itemType } from "../types/types";

export const items = {
  getItems: async ({ prisma }: Context) => {
    return await prisma.furnitureItem.findMany({
      include: { user: true, category: true, subCategory: true },
    });
  },
  getMyItem: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
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
  addItem: async (
    { name, description, price, picture, category, subCategory }: itemType,
    { me, prisma }: Context
  ) => {
    if (!me) {
      throw new Error("User need to login");
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
};
