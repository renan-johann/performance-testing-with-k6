import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { SharedArray } from "k6/data";

const pathCsv = "../datapool/products.csv";

const csvData = new SharedArray("another data name", function () {
  return papaparse.parse(open(pathCsv), {
    header: true,
  }).data;
});

export default function getProductId(inicial, end) {
  function getRandomProducts(csvData) {
    return csvData.slice(inicial, end);
  }

  const productsArray = getRandomProducts(csvData);

  productsArray.forEach((element) => {
    element.product_id;
  });

  console.log("Number of products to iterate", productsArray.length);

  return csvData.slice(inicial, end);
}

console.log(getProductId(0, 4));
