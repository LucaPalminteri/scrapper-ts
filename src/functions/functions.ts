import { Page } from "@playwright/test";

export const goTo = async (page: Page, url: string): Promise<void> => {
  try {
    console.clear();
    console.log("-> Going to Coto Digital...");
    await page.goto(url);
    console.log("\t✓ Done!");
    // await page.screenshot({path: 'screenshot.png'});
  } catch (error) {
    console.error("Error:", error);
  }
};

export const pressEnter = async (page: Page): Promise<void> => {
  try {
    console.clear();
    console.log("-> Pressing Enter...");
    await page.keyboard.press("Enter");
    console.log("\t✓ Done!");
  } catch (error) {
    console.error("Error:", error);
  }
};

// export const waitForNavigation = async (page: Page): Promise<void> => {
//   try {
//     console.clear();
//     console.log("-> Waiting for the search results...");
//     await page.waitForNavigation({ waitUntil: "networkidle0" });
//     console.log("\t✓ Done!");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

export const type = async (page: Page, selector: string, text: string): Promise<void> => {
  try {
    console.clear();
    console.log("-> Typing...");
    await page.type(selector, text);
    console.log("\t✓ Done!");
  } catch (error) {
    console.error("Error:", error);
  }
};

export const loadAndSearch = async (page: Page, url: string, inputSelector: string, search: string): Promise<void> => {
  await goTo(page, url);
  // await setViewport(page, 1080, 1920);
  await type(page, inputSelector, search);
  await pressEnter(page);
  // await waitForNavigation(page);
};

export const getPagination = async (page: Page, selectorPagination: string): Promise<any[]> => {
  console.clear();
  console.log("-> Calculating the pages to retrieve information...");
  return await page.evaluate((selectorPagination) => {
    const links: NodeListOf<Element> = document.querySelectorAll(selectorPagination);
    if (links.length === 0) return [];
    else return Array.from(links).map((link) => (link as HTMLAnchorElement).href);
  }, selectorPagination);
};
