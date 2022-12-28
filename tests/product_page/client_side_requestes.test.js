import http from "k6/http";
import { check, fail, sleep, scenarios } from "k6";
import getConfigValue from "../../utils/handle_configs.js";

const API_BASE_URL = getConfigValue("gateway_origin");
const PRODUCT_ID = 411744;

export const options = {
  scenarios: {
    carga_em_estagios: {
      noConnectionReuse: true,
      noVUConnectionReuse: true,
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "2m", target: 10 },
        { duration: "5m", target: 10 },
        { duration: "2m", target: 20 },
        { duration: "5m", target: 20 },
        { duration: "2m", target: 30 },
        { duration: "5m", target: 30 },
        { duration: "2m", target: 40 },
        { duration: "5m", target: 40 },
        { duration: "10m", target: 0 },
      ],
      gracefulRampDown: "0s",
    }
  },
};

export default () => {
  const response = http.batch([
    ["GET", `${API_BASE_URL}/products/${PRODUCT_ID}/price-history`],
    ["GET", `${API_BASE_URL}/menu`],
    [
      "GET",
      `${API_BASE_URL}/products/related?product-id=${PRODUCT_ID}&limit=5`,
    ],
  ]);

  if (
    !check(response[0], {
      "max duration": (res) => res.timings.duration < 5000,
      "response code was 200": (res) => res.status == 200,
    })
  ) {
    fail("unexpected response");
  }

  sleep(1);
};
