#!/usr/bin/env bash
curl -X POST "https://staging-api.keen.io/3.0/projects/<PROJECT_ID>/queries/count" \
-H "Authorization: <WRITE_KEY>" \
-H "Content-Type: application/json" \
-H "Keen-Compute-Source: cached_queries,cq-c" \
-H "Keen-Sdk: keen_java_aws_lambda-1.0" \
-d "{
    \"filters\": [],
    \"event_collection\": \"client\",
    \"max_age\": 176400,
    \"timeframe\": \"this_14_days\",
    \"query_name\": \"cq-c\",
    \"limit\": null,
    \"order_by\": null,
    \"group_by\": null,
    \"refresh_rate\": 14400,
    \"interval\": null,
    \"force_refresh\": true,
    \"target_property\": \"value\"
    }"
