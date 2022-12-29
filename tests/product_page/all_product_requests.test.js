import http from "k6/http";
import { check, fail, sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics";
import getConfigValue from "../../utils/handle_configs.js";

const API_BASE_URL = getConfigValue("gateway_origin");
const PRODUCT_ID = 411744;

export let GetCustomerDuration = new Trend("get_customer_duration");
export let GetCustomerReqs = new Counter("get_customer_reqs");
export let GetCustomerFailRate = new Rate("get_customer_fail_rate");
export let GetCustomerSuccessRate = new Rate("get_customer_success_rate");

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  discardResponseBodies: true,

  stages: [
    { duration: "2s", target: 10 },
    { duration: "5s", target: 10 },
    { duration: "2s", target: 20 },
    { duration: "5s", target: 20 },
    { duration: "2s", target: 30 },
    { duration: "5s", target: 30 },
    { duration: "2s", target: 40 },
    { duration: "5s", target: 40 },
    { duration: "10s", target: 0 },
  ],

  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<=2000"],
  },
};

export default () => {
  const response = http.batch([
    ["GET", `${API_BASE_URL}/products/${PRODUCT_ID}/base-page`],
    ["GET", `${API_BASE_URL}/products/${PRODUCT_ID}/features`],
    ["GET", `${API_BASE_URL}/products/${PRODUCT_ID}/price-history`],
    ["GET", `${API_BASE_URL}/menu`],
    [
      "GET",
      `${API_BASE_URL}/products/related?product-id=${PRODUCT_ID}&limit=5`,
    ],
  ]);

  GetCustomerReqs.add(1);
  GetCustomerDuration.add(response[0].timings.duration);
  GetCustomerFailRate.add(response[0].status == 0 || response[0].status > 399);
  GetCustomerSuccessRate.add(response[0].status < 399);

  if (
    !check(response[0], {
      "max duration": (res) => res.timings.duration < 5000,
      "response code was 200 || 400": (res) => res.status == (200 || 404),
    })
  ) {
    fail("unexpected response");
  }

  sleep(1);
};
