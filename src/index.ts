import { chromium } from "playwright";
import { Product } from "./types/types";
import { Page } from "@playwright/test";
import { getProducsCoto } from "./functions/functions.coto";

const BASE_URL_COTO: string = "https://www.cotodigital3.com.ar/sitios/cdigi/";

(async () => {
  // const browser = await chromium.launch({
  //   timeout: 30000,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  // });
  const browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  try {
    await page.goto(BASE_URL_COTO);

    let cotoProducts: Product[] = await getProducsCoto(page, BASE_URL_COTO, "leche");

    console.log(`Total products found: ${cotoProducts.length}`);
    //console.log("First few products:", cotoProducts.slice(0, 5));
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
})();
