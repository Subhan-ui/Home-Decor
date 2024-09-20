import { addressType, Context } from "../types/types";

export const address = {
  getAdress: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
    }

    const address = await prisma.address.findFirst({
      where: { userId: me.id },
      include: {
        user: true,
      },
    });
    if (!address) {
      return "No address found";
    }
    return address;
  },

  createAddress: async (
    { street, city, state, postalCode, country }: addressType,
    { prisma, me }: Context
  ) => {
    if (!me) {
      throw new Error("YOu need to login");
    }
    const prev = await prisma.address.findFirst({
      where: { userId: me.id },
    });
    if (prev) {
      throw new Error(
        "Address already exists, You can't have more than one address"
      );
    }
    const address = await prisma.address.create({
      data: {
        userId: me.id,
        street,
        city,
        state,
        postalCode,
        country,
      },
    });
    return address;
  },
  updateAddress: async (
    { street, city, state, postalCode, country }: addressType,
    { prisma, me }: Context
  ) => {
    if (!me) {
      return "user not logged in";
    }
    try {
      await prisma.address.update({
        where: {
          userId: me.id,
        },
        data: {
          street,
          city,
          state,
          postalCode,
          country,
        },
      });
      return "Address Updated Successfully";
    } catch (error) {
      return error + "";
    }
  },
  deleteAddress: async ({ prisma, me }: Context) => {
    if (!me) {
      return "user not logged in";
    }
    try {
      await prisma.address.delete({
        where: {
          userId: me.id,
        },
      });
      return "Address Deleted Successfully";
    } catch (error) {
      return "address not deleted" + error;
    }
  },
};