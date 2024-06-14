import { chromium } from "playwright";
import { Product } from "./types/types";
import { Page } from "@playwright/test";
import { getProducsCoto } from "./functions/functions.coto";

const BASE_URL_COTO: string = "https://www.cotodigital3.com.ar/sitios/cdigi/";

(async () => {
  const browser = await chromium.launch();
  const page: Page = await browser.newPage();

  await page.goto(BASE_URL_COTO);

  let cotoProducts: Product[] = await getProducsCoto(page, BASE_URL_COTO, "leche");

  console.log("Products:", cotoProducts);

  await browser.close();
})();
