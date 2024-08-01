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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducsCoto = exports.calculateProducts = void 0;
var functions_1 = require("./functions");
var config_coto_1 = require("../config/config.coto");
var calculateProducts = function (page, selectors) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.evaluate(function (selectors) {
                    var products = document.querySelectorAll(selectors.productsSelector);
                    var response = [];
                    var map = new Map();
                    products.forEach(function (product, i) {
                        var priceString = product.querySelector(selectors.priceSelector).innerText.trim();
                        var priceDiscount = 0;
                        var title = product.querySelector(selectors.titleSelector).innerText.trim();
                        var image = product.querySelector(selectors.imageSelector).getAttribute("src").trim();
                        var priceUnit = product.querySelector(selectors.priceUnitSelector).innerText.trim();
                        var hasDiscount = false;
                        var price = parseInt(priceString.replace("c/u", "").replace("$", "").replace(/\./g, "").replace(/\./, ".").replace(",", "."));
                        if (product.querySelector(selectors.priceDiscountSelector) !== null) {
                            priceDiscount = product.querySelector(selectors.priceDiscountSelector).innerText.trim();
                            price = priceDiscount;
                            hasDiscount = true;
                        }
                        var productData = {
                            id: i + 1,
                            priceString: priceString,
                            price: price,
                            priceDiscount: priceDiscount,
                            title: title,
                            hasDiscount: hasDiscount,
                            priceUnit: priceUnit,
                            image: image,
                        };
                        console.log(productData);
                        map.set(i + 1, productData);
                        response.push(productData);
                    });
                    return response;
                }, selectors)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.calculateProducts = calculateProducts;
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
var getProducsCoto = function (page, url, search) { return __awaiter(void 0, void 0, void 0, function () {
    var fullProducts, hasNextPage, pageNumber, disabledLinkIndex, products, navButtons, nextButton, _a, _b, _c, nextPageLink;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                fullProducts = [];
                return [4 /*yield*/, (0, functions_1.loadAndSearch)(page, url, config_coto_1.SEARCH_INPUT, search)];
            case 1:
                _d.sent();
                hasNextPage = false;
                pageNumber = 1;
                _d.label = 2;
            case 2:
                console.log("-> Retrieving information from page ".concat(pageNumber, "..."));
                return [4 /*yield*/, page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" })];
            case 3:
                _d.sent();
                console.log("\t✓ Done!");
                return [4 /*yield*/, page.evaluate(function () {
                        var links = document.querySelectorAll("#atg_store_pagination > li > a");
                        return Array.from(links).findIndex(function (link) { return link.classList.contains("disabledLink"); });
                    })];
            case 4:
                disabledLinkIndex = _d.sent();
                console.log("-> Disabled link index:", disabledLinkIndex);
                console.log("-> Should click index:", disabledLinkIndex + 1);
                return [4 /*yield*/, (0, exports.calculateProducts)(page, config_coto_1.SELECTORS)];
            case 5:
                products = _d.sent();
                fullProducts.push.apply(fullProducts, products);
                return [4 /*yield*/, page.$$(config_coto_1.PAGINATION_SELECTOR)];
            case 6:
                navButtons = _d.sent();
                nextButton = navButtons[disabledLinkIndex + 1];
                _b = (_a = console).log;
                _c = ["-> Should click the one with value:"];
                return [4 /*yield*/, (nextButton === null || nextButton === void 0 ? void 0 : nextButton.innerHTML())];
            case 7:
                _b.apply(_a, _c.concat([_d.sent()]));
                console.log("-> Should click with query:", "#atg_store_pagination > li:nth-child(".concat(disabledLinkIndex + 2, ") > a"));
                if (!(nextButton === null)) return [3 /*break*/, 8];
                console.log("-> There's only one page.");
                return [3 /*break*/, 15];
            case 8:
                console.log("-> There are more pages to check.");
                console.log("-> Checking if there's a next page...");
                if (!(disabledLinkIndex !== -1 && disabledLinkIndex < 6)) return [3 /*break*/, 14];
                return [4 /*yield*/, page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" })];
            case 9:
                _d.sent();
                return [4 /*yield*/, page.$("#atg_store_pagination > li:nth-child(".concat(disabledLinkIndex + 2, ") > a"))];
            case 10:
                nextPageLink = _d.sent();
                if (!nextPageLink) return [3 /*break*/, 12];
                console.log("-> Clicking on the next page...");
                return [4 /*yield*/, nextPageLink.click()];
            case 11:
                _d.sent();
                pageNumber++;
                hasNextPage = true;
                return [3 /*break*/, 13];
            case 12:
                hasNextPage = false;
                _d.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                hasNextPage = false;
                _d.label = 15;
            case 15:
                if (hasNextPage) return [3 /*break*/, 2];
                _d.label = 16;
            case 16:
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
                fullProducts.sort(function (a, b) {
                    if (a.hasDiscount && !b.hasDiscount) {
                        return -1;
                    }
                    else if (!a.hasDiscount && b.hasDiscount) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                //console.clear();
                return [2 /*return*/, fullProducts];
        }
    });
}); };
exports.getProducsCoto = getProducsCoto;
