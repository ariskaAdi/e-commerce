import { getAllproductsRepository } from "../../repositories/products/products.repository";

export const getAllProductsService = async () => {
  const response = await getAllproductsRepository();
  return response;
};

export const createProductService = async (data: ) => {};