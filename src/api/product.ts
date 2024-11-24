import { ProductItem } from "../types/Product";

export const fetchProduct = async (): Promise<ProductItem> => {
  const response = await fetch(
    "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
  );

  if (!response.ok) {
    throw new Error("Error with fetch api response.");
  }

  return response.json();
};
