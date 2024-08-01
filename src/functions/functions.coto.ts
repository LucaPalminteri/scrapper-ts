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

// export const getProducsCoto = async (page: Page, url: string, search: string): Promise<Product[]> => {
//   let fullProducts: Product[] = [];

//   await loadAndSearch(page, url, SEARCH_INPUT, search);
//   let pages: any[] = await getPagination(page, PAGINATION_SELECTOR);
//   console.log("-> Calculating the pages to retrieve information...");
//   console.log(pages.length);
//   //let pages: any[] = [];
//   if (pages.length === 0) pages.push({ page: 1 });

//   for (let index = 1; index <= pages.length; index++) {
//     console.log(`-> Retrieving information from page ${index}...`);
//     await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible", timeout: 5000 });
//     console.log("\t✓ Done!");
//     console.clear();
//     const products: Product[] = await calculateProducts(page, SELECTORS);
//     fullProducts.push(...products);
//     if (pages.length > 1 && pages.length != index)
//       await page.click(`#atg_store_pagination > li:nth-child(${index + 1}) > a`);
//   }

//   console.log("-> Sorting products...");
//   fullProducts.sort((a, b) => {
//     if (a.hasDiscount && !b.hasDiscount) {
//       return -1;
//     } else if (!a.hasDiscount && b.hasDiscount) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

//   console.clear();

//   return fullProducts;
// };

export const getProducsCoto = async (page: Page, url: string, search: string): Promise<Product[]> => {
  let fullProducts: Product[] = [];

  await loadAndSearch(page, url, SEARCH_INPUT, search);

  let hasNextPage = false;
  let pageNumber = 1;

  do {
    console.log(`-> Retrieving information from page ${pageNumber}...`);
    await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible" });
    console.log("\t✓ Done!");
    //console.clear();

    const disabledLinkIndex = await page.evaluate(() => {
      const links = document.querySelectorAll("#atg_store_pagination > li > a");
      return Array.from(links).findIndex((link) => link.classList.contains("disabledLink"));
    });

    console.log("-> Disabled link index:", disabledLinkIndex);
    console.log("-> Should click index:", disabledLinkIndex + 1);

    const products: Product[] = await calculateProducts(page, SELECTORS);
    fullProducts.push(...products);

    const navButtons = await page.$$(PAGINATION_SELECTOR);
    const nextButton = navButtons[disabledLinkIndex + 1];

    console.log("-> Should click the one with value:", await nextButton?.innerHTML());
    console.log("-> Should click with query:", `#atg_store_pagination > li:nth-child(${disabledLinkIndex + 2}) > a`);
    if (nextButton === null) {
      console.log("-> There's only one page.");
    } else {
      console.log("-> There are more pages to check.");
      console.log("-> Checking if there's a next page...");

      if (disabledLinkIndex !== -1 && disabledLinkIndex < 6) {
        await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible" });
        const nextPageLink = await page.$(`#atg_store_pagination > li:nth-child(${disabledLinkIndex + 2}) > a`);
        if (nextPageLink) {
          console.log("-> Clicking on the next page...");
          await nextPageLink.click();
          pageNumber++;
          hasNextPage = true;
          //await page.waitForTimeout(2000);
        } else {
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }
  } while (hasNextPage);

  // for (let index = 1; index <= pages.length; index++) {
  //   console.log(`-> Retrieving information from page ${index}...`);
  //   await page.waitForSelector(PRODUCTS_SELECTOR, { state: "visible", timeout: 5000 });
  //   console.log("\t✓ Done!");
  //   console.clear();
  //   const products: Product[] = await calculateProducts(page, SELECTORS);
  //   fullProducts.push(...products);
  //   if (pages.length > 1 && pages.length != index)
  //     await page.click(`#atg_store_pagination > li:nth-child(${index + 1}) > a`);
  // }

  console.log("-> Sorting products...");
  fullProducts.sort((a, b) => {
    if (a.hasDiscount && !b.hasDiscount) {
      return -1;
    } else if (!a.hasDiscount && b.hasDiscount) {
      return 1;
    } else {
      return 0;
    }
  });

  //console.clear();

  return fullProducts;
};
