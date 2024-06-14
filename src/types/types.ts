export type Product = {
  id: number;
  priceString: string;
  price: number;
  priceDiscount?: number;
  title: string;
  hasDiscount: boolean;
  priceUnit?: string;
  image: string;
};
