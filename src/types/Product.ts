export type SizeOption = {
  id: number;
  label: string;
};

export type ProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: SizeOption[];
};

export type CartItem = ProductItem & {
  size: string;
  quantity: number;
};
