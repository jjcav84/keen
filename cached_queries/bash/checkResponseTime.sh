#!/usr/bin/env bash
curl -w "@response-time.txt" -o /Users/filip_sz/Documents/manualRequests/JacobDemo -s https://staging-api.keen.io/3.0/projects/<PROJECT_ID>queries/saved/cq-count/result \
    -H "Authorization: <READ_KEY>" \
    -H 'Content-Type: application/json'