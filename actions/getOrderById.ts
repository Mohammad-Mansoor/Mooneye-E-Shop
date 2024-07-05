import prisma from "@/libs/prismadb";

interface IParams {
  orderId?: string;
}

export default async function getOrderById(params: IParams) {
  try {
    const { orderId } = params;
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) return null;

    return order;
  } catch (error: any) {
    console.error("Error fetching order by ID:", error);
    throw new Error("Error fetching order by ID");
  }
}
