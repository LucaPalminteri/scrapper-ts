/**
 * Represents a product.
 */
export interface Product {
  /**
   * The unique identifier of the product.
   */
  id: number;
  /**
   * The price of the product as a string.
   */
  priceString: string;
  /**
   * The price of the product as a number.
   */
  price: number;
  /**
   * The discounted price of the product (optional).
   */
  priceDiscount?: number;
  /**
   * The title of the product.
   */
  title: string;
  /**
   * Indicates whether the product has a discount.
   */
  hasDiscount: boolean;
  /**
   * The unit of the price (optional).
   */
  priceUnit?: string;
  /**
   * The URL of the product image.
   */
  image: string;
}
