import redisK6 from "k6/x/redis";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "1m",
};

const redis = new redisK6.Client({
  addrs: new Array("localhost:6379"),
  password: "foobar",
});

export function setup() {
  for (let i = 0; i < 8; i++) {
    redis.sadd("crocodile_ids", i);
  }
}

export default () => {
  redis
    .srandmember("crocodile_ids")
    .then((id) => {
      const url = `https://test-api.k6.io/crocodile/${id}`;
      http.get(url);
      return url;
    })
    .then((url) => {
      return redis.hincrby("k6_crocodile_fetched", url);
    });
};

export function teardown() {
  redis.del("crocodile_ids");
}

export function handleSummary(data) {
  redis.set(`k6_report_${Date.now()}`, JSON.stringify(data));
  redis.del(`k6_crocodile_fetched`);
}
