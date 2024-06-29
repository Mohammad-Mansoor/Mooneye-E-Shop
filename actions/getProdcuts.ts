import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    const searchString = searchTerm || "";

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },

      // orderBy: {
      //   createdDate: "desc",
      // },
    });
    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error("An error occurred while fetching products");
  }
}
