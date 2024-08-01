/**
 * The CSS selector for the search input element.
 */
export const SEARCH_INPUT: string = ".atg_store_searchInput";
/**
 * Selector for the pagination element on the website.
 * This selector is used to locate the pagination element on the webpage.
 * It is a CSS selector targeting the specific element.
 */
export const PAGINATION_SELECTOR: string = "#atg_store_pagination > li > a";
/**
 * CSS selector for the products list.
 * This selector is used to identify the HTML elements that represent the products on the page.
 */
export const PRODUCTS_SELECTOR: string = "#products > li";
/**
 * The CSS selector used to locate the price element on the webpage.
 * This selector is used to extract the price information from the HTML.
 */
export const PRICE_SELECTOR: string = ".atg_store_newPrice";
/**
 * The CSS selector used to locate the title of the products.
 * This selector is used to extract the title of each product from the HTML page.
 */
export const TITLE_SELECTOR: string = ".descrip_full";
/**
 * The CSS selector for the image element in the product.
 * This selector is used to locate the image element in the product HTML.
 */
export const IMAGE_SELECTOR: string = ".atg_store_productImage > img";
/**
 * Selector for the price unit in the product.
 * This constant represents the CSS selector used to locate the element that contains the price unit in the product.
 */
export const PRICE_UNIT_SELECTOR: string = ".unit";
/**
 * Selector for the price discount element.
 * This constant represents the CSS selector used to locate the price discount element on the webpage.
 */
export const PRICE_DISCOUNT_SELECTOR: string = ".price_discount";

/**
 * Selectors used for scraping product information.
 */
export const SELECTORS = {
  /**
   * Selector for the products on the page.
   */
  productsSelector: PRODUCTS_SELECTOR,

  /**
   * Selector for the price of a product.
   */
  priceSelector: PRICE_SELECTOR,

  /**
   * Selector for the title of a product.
   */
  titleSelector: TITLE_SELECTOR,

  /**
   * Selector for the image of a product.
   */
  imageSelector: IMAGE_SELECTOR,

  /**
   * Selector for the unit of price.
   */
  priceUnitSelector: PRICE_UNIT_SELECTOR,

  /**
   * Selector for the discount price of a product.
   */
  priceDiscountSelector: PRICE_DISCOUNT_SELECTOR,
};
