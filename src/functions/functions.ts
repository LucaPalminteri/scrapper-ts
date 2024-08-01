import { Page } from "@playwright/test";

/**
 * Navigates to a specified URL using Puppeteer.
 *
 * @param page - The Puppeteer page object.
 * @param url - The URL to navigate to.
 * @returns A Promise that resolves when the navigation is complete.
 */
export const goTo = async (page: Page, url: string): Promise<void> => {
  try {
    console.clear();
    console.log("-> Going to Coto Digital...");
    await page.goto(url);
    console.log("\t✓ Done!");
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 * Presses the Enter key on the keyboard.
 *
 * @param page - The Playwright page object.
 * @returns A Promise that resolves when the Enter key has been pressed.
 */
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

/**
 * Types text into an input field on a web page.
 *
 * @param page - The Puppeteer page object.
 * @param selector - The CSS selector of the input field.
 * @param text - The text to type into the input field.
 * @returns A Promise that resolves when the text has been typed.
 */
export const type = async (page: Page, selector: string, text: string): Promise<void> => {
  try {
    console.clear();
    console.log("-> Typing...");
    await page.waitForSelector(selector, { state: "visible", timeout: 5000 });
    await page.fill(selector, text);
    console.log("\t✓ Done!");
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 * Loads a web page, types text into an input field, and presses Enter.
 *
 * @param page - The Puppeteer page object.
 * @param url - The URL of the web page to load.
 * @param inputSelector - The CSS selector of the input field.
 * @param search - The text to type into the input field.
 * @returns A Promise that resolves when the page has been loaded, text has been typed, and Enter has been pressed.
 */
export const loadAndSearch = async (page: Page, url: string, inputSelector: string, search: string): Promise<void> => {
  await goTo(page, url);
  await type(page, inputSelector, search);
  await pressEnter(page);
};
