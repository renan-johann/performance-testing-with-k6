## PERFORMANCE TESTING
[steps to install]: https://k6.io/docs/getting-started/installation/

##### Prerequisites
> docker-compose installed

##### Installation Procedure
> [Steps to install]

##### Project hierarchy structure
```bash
.
├── configs
│   ├── production.json
│   └── qa.json
├── dashboards
│   ├── k6-load-testing-results-by-groups.json
│   └── k6-load-testing-results.json
├── datapool
│   └── products.csv
├── reports
│   ├── all_product_requests.html
│   └── server_side_requestes.html
├── tests
│   ├── cache
│   │   └── redis_test.js
│   ├── database
│   │   └── postgres_test.js
│   └── product_page
│       ├── all_product_requests.test.js
│       ├── client_side_requestes.test.js
│       └── server_side_requestes.test.js
├── utils
│   ├── generate_random_number.js
│   ├── handle_configs.js
│   └── handle_csv.js
├── docker-compose.yml
├── grafana-dashboard.yaml
├── grafana-datasource.yaml
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

##### Breaking it Down containers:
![docker image](./images/docker.png)

##### Open a browser to http://localhost:3000/d/k6/k6-load-testing-results and I’ll have an view of my load test streaming across the page in real-time:
![docker image](./images/grafana.png)

##### Running a load test requires that the InfluxDB and Grafana services are already running in the background. I can use docker-compose ‘up’ command to start them:
`docker compose -f ./docker-compose.yml up -d influxdb grafana`
> Ps.: The docker images will be downloaded, configured and executed as detached (-d) background processes.

##### Then I can run docker-compose to perform a K6 run on a load test script:
`docker compose -f ./docker-compose.yml run k6 run /scripts/tests/product_page/client_side_requestes.test.js`