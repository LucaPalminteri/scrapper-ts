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
exports.calculateProducts = exports.getProducsCoto = void 0;
const functions_1 = require("./functions");
const config_coto_1 = require("../config/config.coto");
console.log("SEARCH_INPUT:", config_coto_1.SEARCH_INPUT);
console.log("PAGINATION_SELECTOR:", config_coto_1.PAGINATION_SELECTOR);
console.log("PRODUCTS_SELECTOR:", config_coto_1.PRODUCTS_SELECTOR);
console.log("SELECTORS:", config_coto_1.SELECTORS);
const getProducsCoto = (page, url, search) => __awaiter(void 0, void 0, void 0, function* () {
    let fullProducts = [];
    console.log("-> Loading and searching...");
    yield (0, functions_1.loadAndSearch)(page, url, config_coto_1.SEARCH_INPUT, search);
    let hasNextPage = true;
    while (hasNextPage) {
        yield page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" });
        const products = yield (0, exports.calculateProducts)(page, config_coto_1.SELECTORS);
        fullProducts.push(...products);
        hasNextPage = yield goToNextPage(page);
    }
    return sortProducts(fullProducts);
});
exports.getProducsCoto = getProducsCoto;
const calculateProducts = (page, selectors) => __awaiter(void 0, void 0, void 0, function* () {
    return yield page.evaluate((selectors) => {
        const products = document.querySelectorAll(selectors.productsSelector);
        let response = [];
        let map = new Map();
        products.forEach((product, i) => {
            let priceString = product.querySelector(selectors.priceSelector).innerText.trim();
            let priceDiscount = 0;
            let title = product.querySelector(selectors.titleSelector).innerText.trim();
            let image = product.querySelector(selectors.imageSelector).getAttribute("src").trim();
            let priceUnit = product.querySelector(selectors.priceUnitSelector).innerText.trim();
            let hasDiscount = false;
            let price = parseInt(priceString.replace("c/u", "").replace("$", "").replace(/\./g, "").replace(/\./, ".").replace(",", "."));
            if (product.querySelector(selectors.priceDiscountSelector) !== null) {
                priceDiscount = product.querySelector(selectors.priceDiscountSelector).innerText.trim();
                price = priceDiscount;
                hasDiscount = true;
            }
            let productData = {
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
});
exports.calculateProducts = calculateProducts;
const goToNextPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const disabledLinkIndex = yield getDisabledLinkIndex(page);
    const navButtons = yield page.$$(config_coto_1.PAGINATION_SELECTOR);
    if (disabledLinkIndex === -1 || disabledLinkIndex >= 6) {
        return false;
    }
    const nextButton = navButtons[disabledLinkIndex + 1];
    if (!nextButton) {
        return false;
    }
    const nextPageLink = yield page.$(`#atg_store_pagination > li:nth-child(${disabledLinkIndex + 2}) > a`);
    if (!nextPageLink) {
        return false;
    }
    yield nextPageLink.click();
    yield page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" });
    return true;
});
const sortProducts = (products) => {
    return products.sort((a, b) => {
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
};
const getDisabledLinkIndex = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return yield page.evaluate(() => {
        const links = document.querySelectorAll(config_coto_1.PAGINATION_SELECTOR);
        return Array.from(links).findIndex((link) => link.classList.contains("disabledLink"));
    });
});
//# sourceMappingURL=functions.coto.js.map