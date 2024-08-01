import { chromium } from "playwright";
import { Product } from "./interfaces/Product";
import { Browser, Page } from "@playwright/test";
import { getProducsCoto } from "./functions/functions.coto";

const BASE_URL_COTO: string = "https://www.cotodigital3.com.ar/sitios/cdigi/";

(async (url: string): Promise<void> => {
  const browser: Browser = await chromium.launch({
    timeout: 30000,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page: Page = await browser.newPage();

  try {
    await page.goto(url);

    let cotoProducts: Product[] = await getProducsCoto(page, url, "leche");

    console.log(`Total products found: ${cotoProducts.length}`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
})(BASE_URL_COTO);
