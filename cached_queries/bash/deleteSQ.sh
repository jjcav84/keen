#!/usr/bin/env bash
curl https://staging-api.keen.io/3.0/projects/<PROJECT_ID>queries/saved/cq-c \
    -H "Authorization: <MASTER_KEY>" \
    -X DELETE