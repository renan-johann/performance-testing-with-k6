import { fail } from "k6";

const configs = JSON.parse(open("../configs/qa.json"));

export default function getConfigValue(jsonKey) {
  configs[__VU - 1];
  if (!configs[jsonKey]) {
    fail(`The config \"${jsonKey}\" doesn't exist`);
  }
  return configs[jsonKey];
}
