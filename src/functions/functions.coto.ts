import { loadAndSearch, getPagination } from "./functions";
import { SEARCH_INPUT, PAGINATION_SELECTOR, PRODUCTS_SELECTOR, SELECTORS } from "../config/config.coto";
import { Product } from "../types/types.js";
import { Page } from "@playwright/test";

export const calculateProducts = async (page: Page, selectors: any): Promise<Product[]> => {
  return await page.evaluate((selectors) => {
    const products: NodeListOf<any> = document.querySelectorAll(selectors.productsSelector);

    let response: Product[] = [];
    let map: Map<number, Product> = new Map();

    products.forEach((product: any, i: number) => {
      let priceString: string = product.querySelector(selectors.priceSelector).innerText.trim();
      let priceDiscount: number = 0;
      let title: string = product.querySelector(selectors.titleSelector).innerText.trim();
      let image: string = product.querySelector(selectors.imageSelector).getAttribute("src").trim();
      let priceUnit: string = product.querySelector(selectors.priceUnitSelector).innerText.trim();
      let hasDiscount: boolean = false;
      let price: number = parseInt(
        priceString.replace("c/u", "").replace("$", "").replace(/\./g, "").replace(/\./, ".").replace(",", ".")
      );

      if (product.querySelector(selectors.priceDiscountSelector) !== null) {
        priceDiscount = product.querySelector(selectors.priceDiscountSelector).innerText.trim();
        price = priceDiscount;
        hasDiscount = true;
      }

      let productData: Product = {
        id: i + 1,
        priceString,
        price,
        priceDiscount,
        title,
        hasDiscount,
        priceUnit,
        image,
      };

      console.log(productData);

      map.set(i + 1, productData);

      response.push(productData);
    });

    return response;
  }, selectors);
};

export const getProducsCoto = async (page: Page, url: string, search: string): Promise<Product[]> => {
  let fullProducts: Product[] = [];

  await loadAndSearch(page, url, SEARCH_INPUT, search);
  // let pages: any[] = await getPagination(page, PAGINATION_SELECTOR);
  let pages: any[] = [];
  if (pages.length === 0) pages.push({ page: 1 });

  for (let index = 1; index <= pages.length; index++) {
    await page.waitForSelector(PRODUCTS_SELECTOR);
    const products: Product[] = await calculateProducts(page, SELECTORS);
    fullProducts.push(...products);
    if (pages.length > 1 && pages.length != index)
      await page.click(`#atg_store_pagination > li:nth-child(${index + 1}) > a`);
  }

  fullProducts.sort((a, b) => {
    if (a.hasDiscount && !b.hasDiscount) {
      return -1;
    } else if (!a.hasDiscount && b.hasDiscount) {
      return 1;
    } else {
      return 0;
    }
  });

  console.clear();

  return fullProducts;
};
