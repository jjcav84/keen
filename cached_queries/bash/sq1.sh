#!/usr/bin/env bash
curl -X PUT "https://staging-api.keen.io/3.0/projects/<PROJECT_ID>/queries/saved/cq-c" \
-H "Authorization: <MASTER_KEY>" \
-H "Content-Type: application/json" \
-d '{
        "refresh_rate": 0,
        "query": {
            "analysis_type": "count",
            "event_collection": "client",
            "timeframe": "this_14_weeks",
            "timezone": "UTC",
            "group_by": [
                "client"
            ]
        }
    }' | python -m json.tool