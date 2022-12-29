import { sleep, group } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const chunkHeader = {
  headers: {
    Host: 'staging.kuantokusta.pt',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    Referer:
      'https://staging.kuantokusta.pt/p/7830079/samsung-galaxy-a53-5g-646-dual-sim-6gb128gb-black',
    Connection: 'keep-alive',
    Cookie:
      '_ga_L52D1YE3FS=GS1.1.1658229188.4.1.1658229218.0; _ga=GA1.2.1116874458.1644339620; _pxvid=9915a79f-8900-11ec-be21-52616f6a526b; _pin_unauth=dWlkPU9XSmxaREJtT0dFdE1UYzFOUzAwTm1abExXSXpOakl0TnpjeE1Ua3dZelJqTXpsaQ; _fbp=fb.1.1644339622168.1258213538; _clck=1y1nhy8|1|f3a|0; __gads=ID=9f11cee378201e67:T=1644339633:S=ALNI_MayhS8Eausgh3MHSs5VQQU1eNCPXw; pxcts=012f0c5d-0741-11ed-b902-597275686269; _ga_4V38YJJ5H5=GS1.1.1658221129.1.1.1658223725.0; _gid=GA1.2.225078525.1658221130; _px2=eyJ1IjoiYzRlYjJjMjAtMDc1My0xMWVkLWFhMmEtNTUxMjNlNzFjODdiIiwidiI6Ijk5MTVhNzlmLTg5MDAtMTFlYy1iZTIxLTUyNjE2ZjZhNTI2YiIsInQiOjE2NTgyMjk0OTAyNTEsImgiOiJjMWIxYjM2NzNiMzE2MGVjYjFkMjA3Mzg2MmY2YWJiOTYwOTUzMTk0NTAxYzJlMzcyN2RlN2E4NTU4ZTY1ZTBmIn0=; _clsk=1s6nd1n|1658229192297|2|1|d.clarity.ms/collect; _gcl_au=1.1.1448541117.1658221171; _gaexp=GAX1.2.1oXfmhdaTwO5ompIFLVncA.19272.1; _hjSessionUser_216250=eyJpZCI6IjExNjk3NjJhLWUxYmUtNTE1Yi1hOTJhLTQzZGViMTE0MDRlMiIsImNyZWF0ZWQiOjE2NTgyMjM3MjgwODUsImV4aXN0aW5nIjp0cnVlfQ==; _hjIncludedInSessionSample=0; _hjIncludedInPageviewSample=1; CookieConsent={stamp:%27iJUGnpTbsGAb4WCrR0YbMTsz9GlLIZQq2ZDvK/QO7xm6/RMKz6JlJQ==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:2%2Cutc:1658223728273%2Cregion:%27pt%27}; _gat_UA-83925-1=1; _uetsid=0201bcf0074111ed914e85e0942ffa88; _uetvid=99344ad0890011ec8996259e71c36002; _hjSession_216250=eyJpZCI6IjQxMTZlNDE4LTg1YWItNGFmNC05MzQ5LTcxOTFlYWVlMzFjMCIsImNyZWF0ZWQiOjE2NTgyMjkxOTAzMzgsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=1',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-origin',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    TE: 'trailers',
  }
}

const pathCsv = "../../datapool/pro_products_id.csv";

const csvData = new SharedArray('another data name', function () {
    return papaparse.parse(open(pathCsv), { header: true }).data;
});

export const options = {
  scenarios: {
      contacts: {
          executor: 'shared-iterations',
          vus: 10,
          iterations: 500,
          maxDuration: '5m',
      },
  },
}

export default () => {
  csvData.forEach((value) => {
    let response

    group('Chunks', () => {
      response = http.get('https://staging.kuantokusta.pt/favicon.ico', {
        headers: {
          Host: 'staging.kuantokusta.pt',
          'User-Agent':
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
          Accept: 'image/avif,image/webp,*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          Referer:
            'https://staging.kuantokusta.pt/p/7830079/samsung-galaxy-a53-5g-646-dual-sim-6gb128gb-black',
          Connection: 'keep-alive',
          Cookie:
            '_ga_L52D1YE3FS=GS1.1.1658229188.4.1.1658229220.0; _ga=GA1.1.1116874458.1644339620; _pxvid=9915a79f-8900-11ec-be21-52616f6a526b; _pin_unauth=dWlkPU9XSmxaREJtT0dFdE1UYzFOUzAwTm1abExXSXpOakl0TnpjeE1Ua3dZelJqTXpsaQ; _fbp=fb.1.1644339622168.1258213538; _clck=1y1nhy8|1|f3a|0; __gads=ID=9f11cee378201e67:T=1644339633:S=ALNI_MayhS8Eausgh3MHSs5VQQU1eNCPXw; pxcts=012f0c5d-0741-11ed-b902-597275686269; _ga_4V38YJJ5H5=GS1.1.1658221129.1.1.1658223725.0; _gid=GA1.2.225078525.1658221130; _px2=eyJ1IjoiYzRlYjJjMjAtMDc1My0xMWVkLWFhMmEtNTUxMjNlNzFjODdiIiwidiI6Ijk5MTVhNzlmLTg5MDAtMTFlYy1iZTIxLTUyNjE2ZjZhNTI2YiIsInQiOjE2NTgyMjk0OTAyNTEsImgiOiJjMWIxYjM2NzNiMzE2MGVjYjFkMjA3Mzg2MmY2YWJiOTYwOTUzMTk0NTAxYzJlMzcyN2RlN2E4NTU4ZTY1ZTBmIn0=; _clsk=1s6nd1n|1658229192297|2|1|d.clarity.ms/collect; _gcl_au=1.1.1448541117.1658221171; _gaexp=GAX1.2.1oXfmhdaTwO5ompIFLVncA.19272.1; _hjSessionUser_216250=eyJpZCI6IjExNjk3NjJhLWUxYmUtNTE1Yi1hOTJhLTQzZGViMTE0MDRlMiIsImNyZWF0ZWQiOjE2NTgyMjM3MjgwODUsImV4aXN0aW5nIjp0cnVlfQ==; _hjIncludedInSessionSample=0; _hjIncludedInPageviewSample=1; CookieConsent={stamp:%27iJUGnpTbsGAb4WCrR0YbMTsz9GlLIZQq2ZDvK/QO7xm6/RMKz6JlJQ==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:2%2Cutc:1658223728273%2Cregion:%27pt%27}; _gat_UA-83925-1=1; _uetsid=0201bcf0074111ed914e85e0942ffa88; _uetvid=99344ad0890011ec8996259e71c36002; _hjSession_216250=eyJpZCI6IjQxMTZlNDE4LTg1YWItNGFmNC05MzQ5LTcxOTFlYWVlMzFjMCIsImNyZWF0ZWQiOjE2NTgyMjkxOTAzMzgsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=1',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
          TE: 'trailers',
        },
      })

      response = http.get(
        `https://staging.kuantokusta.pt/p/${value.product_id}/samsung-galaxy-a53-5g-646-dual-sim-6gb128gb-black?t=`+Date.now(),
        {
          headers: {
            Host: 'staging.kuantokusta.pt',
            'User-Agent':
              'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            Cookie:
              '_ga_L52D1YE3FS=GS1.1.1658229188.4.1.1658229189.0; _ga=GA1.2.1116874458.1644339620; _pxvid=9915a79f-8900-11ec-be21-52616f6a526b; _pin_unauth=dWlkPU9XSmxaREJtT0dFdE1UYzFOUzAwTm1abExXSXpOakl0TnpjeE1Ua3dZelJqTXpsaQ; _fbp=fb.1.1644339622168.1258213538; _clck=1y1nhy8|1|f3a|0; __gads=ID=9f11cee378201e67:T=1644339633:S=ALNI_MayhS8Eausgh3MHSs5VQQU1eNCPXw; pxcts=012f0c5d-0741-11ed-b902-597275686269; _ga_4V38YJJ5H5=GS1.1.1658221129.1.1.1658223725.0; _gid=GA1.2.225078525.1658221130; _px2=eyJ1IjoiYzRlYjJjMjAtMDc1My0xMWVkLWFhMmEtNTUxMjNlNzFjODdiIiwidiI6Ijk5MTVhNzlmLTg5MDAtMTFlYy1iZTIxLTUyNjE2ZjZhNTI2YiIsInQiOjE2NTgyMjk0OTAyNTEsImgiOiJjMWIxYjM2NzNiMzE2MGVjYjFkMjA3Mzg2MmY2YWJiOTYwOTUzMTk0NTAxYzJlMzcyN2RlN2E4NTU4ZTY1ZTBmIn0=; _clsk=1s6nd1n|1658229192297|2|1|d.clarity.ms/collect; _gcl_au=1.1.1448541117.1658221171; _gaexp=GAX1.2.1oXfmhdaTwO5ompIFLVncA.19272.1; _hjSessionUser_216250=eyJpZCI6IjExNjk3NjJhLWUxYmUtNTE1Yi1hOTJhLTQzZGViMTE0MDRlMiIsImNyZWF0ZWQiOjE2NTgyMjM3MjgwODUsImV4aXN0aW5nIjp0cnVlfQ==; _hjIncludedInSessionSample=0; _hjIncludedInPageviewSample=1; CookieConsent={stamp:%27iJUGnpTbsGAb4WCrR0YbMTsz9GlLIZQq2ZDvK/QO7xm6/RMKz6JlJQ==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:2%2Cutc:1658223728273%2Cregion:%27pt%27}; _gat_UA-83925-1=1; _uetsid=0201bcf0074111ed914e85e0942ffa88; _uetvid=99344ad0890011ec8996259e71c36002; _hjSession_216250=eyJpZCI6IjQxMTZlNDE4LTg1YWItNGFmNC05MzQ5LTcxOTFlYWVlMzFjMCIsImNyZWF0ZWQiOjE2NTgyMjkxOTAzMzgsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=1',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        }
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/686.9ec90b880569844f.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/8937.01df60270e3679dd.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/5565.d35c7cee17677501.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/7744.cee7f2ece64ab5e1.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/6665.e035b2271ddb46c0.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/4139.4f833544c253dddb.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/6082.5ce1025ebdb063f1.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/5870.74189234155458b1.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/4584.830c11465a710c16.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/2068.981588b11088fcee.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/7567.de185ce7edb4b0a2.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/6827.575681babc971436.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/7924.267ef411a73b7f8a.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/8690.1f006c8aaf08a847.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/9411.5e33baa3eee86580.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/3978.46d5ad59fe2f30d8.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/5387.8be2684a4a9aab2e.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/2527.aaaf5c9b659e1816.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/webpack-53fd69e31c3362e8.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/framework-d51ece3d757c7ed2.js',
        chunkHeader
      )
      
      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/main-aba01afbcf866d29.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/pages/_app-bdbf31d55d6b7ca3.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/36bcf0ca-dfdfa54ec91d6058.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/5675-f6a36ee1146c3266.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/4273-c3d8314e7e656688.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/8640-3bea5fe5f2b39387.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/pages/p/%5Bid%5D/%5Bslug%5D-6ed2dc049d811fdb.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/ZIyK6hYrNWNtdlR92JhbX/_buildManifest.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/ZIyK6hYrNWNtdlR92JhbX/_ssgManifest.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/7730.97156747a983bda8.js',
        chunkHeader
      )

      response = http.get(
        'https://staging.kuantokusta.pt/_next/static/chunks/8718.87044f33a95fe49f.js',
        chunkHeader
      )
    })
});

  sleep(1)
}
