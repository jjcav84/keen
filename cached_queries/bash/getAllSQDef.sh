#!/usr/bin/env bash
curl https://staging-api.keen.io/3.0/projects/<PROJECT_ID>queries/saved \
    -H "Authorization: <MASTER_KEY>" \
    -H 'Content-Type: application/json' | python -m json.tool