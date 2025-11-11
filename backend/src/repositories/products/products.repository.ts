import { prisma } from "../../config/prisma";

export const getAllproductsRepository = async () => {
  return await prisma.items.findMany({
    include: {
      item_images: true,
    },
  });
};
