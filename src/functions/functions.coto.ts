import { loadAndSearch } from "./functions";
import { SEARCH_INPUT, PAGINATION_SELECTOR, PRODUCTS_SELECTOR, SELECTORS } from "../config/config.coto";
import { Product } from "../types/types.js";
import { Page } from "@playwright/test";

console.log("SEARCH_INPUT:", SEARCH_INPUT);
console.log("PAGINATION_SELECTOR:", PAGINATION_SELECTOR);
console.log("PRODUCTS_SELECTOR:", PRODUCTS_SELECTOR);
console.log("SELECTORS:", SELECTORS);

export const getProducsCoto = async (page: Page, url: string, search: string): Promise<Product[]> => {
  let fullProducts: Product[] = [];

  console.log("-> Loading and searching...");
  await loadAndSearch(page, url, SEARCH_INPUT, search);

  let hasNextPage = true;

  while (hasNextPage) {
    await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible" });

    const products: Product[] = await calculateProducts(page, SELECTORS);
    fullProducts.push(...products);

    hasNextPage = await goToNextPage(page);
  }

  return sortProducts(fullProducts);
};

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

const goToNextPage = async (page: Page): Promise<boolean> => {
  const disabledLinkIndex = await getDisabledLinkIndex(page);
  const navButtons = await page.$$(PAGINATION_SELECTOR);

  if (disabledLinkIndex === -1 || disabledLinkIndex >= 6) {
    return false;
  }

  const nextButton = navButtons[disabledLinkIndex + 1];
  if (!nextButton) {
    return false;
  }

  const nextPageLink = await page.$(`#atg_store_pagination > li:nth-child(${disabledLinkIndex + 2}) > a`);
  if (!nextPageLink) {
    return false;
  }

  await nextPageLink.click();
  await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible" });

  return true;
};

/**
 * Sorts an array of products based on whether they have a discount or not.
 * Products with a discount will be placed before products without a discount.
 * If two products have the same discount status, their order remains unchanged.
 *
 * @param products - The array of products to be sorted.
 * @returns The sorted array of products.
 */
const sortProducts = (products: Product[]): Product[] => {
  return products.sort((a, b) => {
    if (a.hasDiscount && !b.hasDiscount) {
      return -1;
    } else if (!a.hasDiscount && b.hasDiscount) {
      return 1;
    } else {
      return 0;
    }
  });
};

/**
 * Returns the index of the first disabled link element in the pagination.
 *
 * @param page - The Playwright page object.
 * @returns The index of the first disabled link element, or -1 if no disabled link is found.
 */
const getDisabledLinkIndex = async (page: Page): Promise<number> => {
  return await page.evaluate(() => {
    const links = document.querySelectorAll(PAGINATION_SELECTOR);
    return Array.from(links).findIndex((link) => link.classList.contains("disabledLink"));
  });
};
