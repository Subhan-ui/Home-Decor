import { Context } from "../types/types";

export const orders = {
  getOrders: async ({ prisma, me }: Context) => {
    if (!me) {
      throw new Error("You need to login");
    }
    const orders = await prisma.order.findMany({
      where: { userId: me.id },
      include: {
        user: true,
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
    });
    if (orders) {
      return orders;
    }
    throw new Error("No orders found");
  },
  addOrderItem: async (
    { productId, quantity }: { productId: string; quantity: number },
    { prisma, me }: Context
  ) => {
    if (!me) {
      return "You need to login";
    }
    try {
      const item = await prisma.furnitureItem.findFirst({
        where: { id: productId },
      });
      if (!item) {
        return "item not found";
      }
      const user = await prisma.user.findFirst({
        where: { id: me.id },
        include: {
          orders: true,
        },
      });
      const orders = user?.orders;
      const pendingOrder = orders?.find((order) => order.status === "PENDING");
      if (pendingOrder) {
        const existingItem = await prisma.orderItem.findFirst({
          where: { furnitureItemId: productId, orderId: pendingOrder.id },
        });
        if (existingItem) {
          await prisma.orderItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: quantity + existingItem.quantity,
            },
          });
          await prisma.order.update({
            where: { id: pendingOrder.id },
            data: {
              totalPrice: pendingOrder.totalPrice + item.price * quantity,
            },
          });
          return "Order and OrderItem updated.";
        }
        await prisma.orderItem.create({
          data: {
            orderId: pendingOrder.id,
            quantity: quantity,
            price: item.price,
            furnitureItemId: item.id,
          },
        });
        await prisma.order.update({
          where: { id: pendingOrder.id },
          data: {
            totalPrice: pendingOrder.totalPrice + item.price * quantity,
          },
        });
        return "New OrderItem created.";
      }

      const order = await prisma.order.create({
        data: {
          userId: me.id,
          totalPrice: item.price * quantity,
        },
      });
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          quantity: quantity,
          price: item.price,
          furnitureItemId: item.id,
        },
      });
      return "Order and OrderItem created.";
    } catch (error) {
      return "An error occured" + error;
    }
  },
  makeOrder: async ({ id }: { id: string }, { prisma, me }: Context) => {
    if (!me) {
      return "You need to Login";
    }
    const order = await prisma.order.findFirst({
      where: { id, userId: me.id },
    });
    if (!order) {
      return "No Order exist";
    }
    if (order.status !== "PENDING") {
      return "Order already made or cancelled.";
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "IN_PROGRESS" },
    });
    return "Order made successfully";
  },
  delivered: async ({ id }: { id: string }, { prisma, me }: Context) => {
    if (!me) {
      return "You need to login";
    }
    if (me.role === "USER") {
      return "Only admins will deliver orders";
    }
    const order = await prisma.order.findFirst({
      where: { id },
    });
    if (!order) {
      return "no Order Exist";
    }
    if (order.status === "PENDING") {
      return "order is not yet made";
    }
    if (order.status === "CANCELED") {
      return "Order Cancelled";
    }
    if (order.status === "DELIVERED") {
      return "Order already delivered";
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "DELIVERED" },
    });
    return "Order delivered successfully";
  },
  cancelOrder: async ({ id }: { id: string }, { prisma, me }: Context) => {
    if (!me) {
      return "You need to login";
    }
    const order = await prisma.order.findFirst({
      where: { id, userId: me.id },
    });
    if (!order) {
      return "no Order Exist";
    }
    if (order.status === "CANCELED") {
      return "Order already Cancelled";
    }
    if (order.status === "DELIVERED") {
      return "Order already delivered";
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELED" },
    });
    return "Your order is cancelled";
  },
  deleted: async ({ id }: { id: string }, { prisma, me }: Context) => {
    if (!me) {
      return "You need to login";
    }
    const order = await prisma.order.findFirst({
      where: { id: id, userId: me.id },
      include: {
        items: true,
      },
    });
    if (!order) {
      return "NO order exist";
    }
    await prisma.orderItem.deleteMany({
      where: { orderId: order.id },
    });
    await prisma.order.delete({
      where: { id: order.id },
    });
    return "Order Deleted";
  },
};
