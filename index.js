import basePageSpec from "./tests/base_page.test.js";
import priceHistorySpec from "./tests/price_history.test.js";
import { group, sleep } from "k6";

export default function () {
  group("Endpoint - BASE-PAGE-SPEC", () => {
    basePageSpec();
    priceHistorySpec();
  });

  sleep(1);

  group("Endpoint - PRICE-HISTORY-SPEC", () => {
    priceHistorySpec();
  });

  sleep(1);
}
