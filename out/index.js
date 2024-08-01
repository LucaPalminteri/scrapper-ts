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
const playwright_1 = require("playwright");
const functions_coto_1 = require("./functions/functions.coto");
const BASE_URL_COTO = "https://www.cotodigital3.com.ar/sitios/cdigi/";
(() => __awaiter(void 0, void 0, void 0, function* () {
    // const browser = await chromium.launch({
    //   timeout: 30000,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    // });
    const browser = yield playwright_1.chromium.launch({ headless: false });
    const page = yield browser.newPage();
    try {
        yield page.goto(BASE_URL_COTO);
        let cotoProducts = yield (0, functions_coto_1.getProducsCoto)(page, BASE_URL_COTO, "leche");
        console.log(`Total products found: ${cotoProducts.length}`);
        //console.log("First few products:", cotoProducts.slice(0, 5));
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    finally {
        yield browser.close();
    }
}))();
//# sourceMappingURL=index.js.map