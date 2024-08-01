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
exports.calculateProducts = exports.getProducsCoto = void 0;
var functions_1 = require("./functions");
var config_coto_1 = require("../config/config.coto");
console.log("SEARCH_INPUT:", config_coto_1.SEARCH_INPUT);
console.log("PAGINATION_SELECTOR:", config_coto_1.PAGINATION_SELECTOR);
console.log("PRODUCTS_SELECTOR:", config_coto_1.PRODUCTS_SELECTOR);
console.log("SELECTORS:", config_coto_1.SELECTORS);
var getProducsCoto = function (page, url, search) { return __awaiter(void 0, void 0, void 0, function () {
    var fullProducts, hasNextPage, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fullProducts = [];
                console.log("-> Loading and searching...");
                return [4 /*yield*/, (0, functions_1.loadAndSearch)(page, url, config_coto_1.SEARCH_INPUT, search)];
            case 1:
                _a.sent();
                hasNextPage = true;
                _a.label = 2;
            case 2:
                if (!hasNextPage) return [3 /*break*/, 6];
                return [4 /*yield*/, page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, exports.calculateProducts)(page, config_coto_1.SELECTORS)];
            case 4:
                products = _a.sent();
                fullProducts.push.apply(fullProducts, products);
                return [4 /*yield*/, goToNextPage(page)];
            case 5:
                hasNextPage = _a.sent();
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, sortProducts(fullProducts)];
        }
    });
}); };
exports.getProducsCoto = getProducsCoto;
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
var goToNextPage = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var disabledLinkIndex, navButtons, nextButton, nextPageLink;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDisabledLinkIndex(page)];
            case 1:
                disabledLinkIndex = _a.sent();
                return [4 /*yield*/, page.$$(config_coto_1.PAGINATION_SELECTOR)];
            case 2:
                navButtons = _a.sent();
                if (disabledLinkIndex === -1 || disabledLinkIndex >= 6) {
                    return [2 /*return*/, false];
                }
                nextButton = navButtons[disabledLinkIndex + 1];
                if (!nextButton) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, page.$("#atg_store_pagination > li:nth-child(".concat(disabledLinkIndex + 2, ") > a"))];
            case 3:
                nextPageLink = _a.sent();
                if (!nextPageLink) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, nextPageLink.click()];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector(config_coto_1.PRODUCTS_SELECTOR, { state: "visible" })];
            case 5:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var sortProducts = function (products) {
    return products.sort(function (a, b) {
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
var getDisabledLinkIndex = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.evaluate(function () {
                    var links = document.querySelectorAll(config_coto_1.PAGINATION_SELECTOR);
                    return Array.from(links).findIndex(function (link) { return link.classList.contains("disabledLink"); });
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
