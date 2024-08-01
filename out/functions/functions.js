"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = exports.loadAndSearch = exports.type = exports.pressEnter = exports.goTo = void 0;
const goTo = (page, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.clear();
        console.log("-> Going to Coto Digital...");
        yield page.goto(url);
        console.log("\t✓ Done!");
        // await page.screenshot({path: 'screenshot.png'});
    }
    catch (error) {
        console.error("Error:", error);
    }
});
exports.goTo = goTo;
const pressEnter = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.clear();
        console.log("-> Pressing Enter...");
        yield page.keyboard.press("Enter");
        console.log("\t✓ Done!");
    }
    catch (error) {
        console.error("Error:", error);
    }
});
exports.pressEnter = pressEnter;
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
const type = (page, selector, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.clear();
        console.log("-> Typing...");
        yield page.waitForSelector(selector, { state: "visible", timeout: 5000 });
        yield page.fill(selector, text);
        console.log("\t✓ Done!");
    }
    catch (error) {
        console.error("Error:", error);
    }
});
exports.type = type;
const loadAndSearch = (page, url, inputSelector, search) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.goTo)(page, url);
    // await setViewport(page, 1080, 1920);
    yield (0, exports.type)(page, inputSelector, search);
    yield (0, exports.pressEnter)(page);
    //await waitForNavigation(page);
    //console.clear();
});
exports.loadAndSearch = loadAndSearch;
const getPagination = (page, selectorPagination) => __awaiter(void 0, void 0, void 0, function* () {
    //console.clear();
    console.log("-> Calculating the pages to retrieve information...");
    yield page.waitForSelector(selectorPagination, { state: "visible" });
    // const frame = page.mainFrame();
    return yield page.evaluate((selectorPagination) => {
        const links = document.querySelectorAll(selectorPagination);
        if (links.length === 0)
            return [];
        else
            return Array.from(links).map((link) => link.href);
    }, selectorPagination);
});
exports.getPagination = getPagination;
//# sourceMappingURL=functions.js.map