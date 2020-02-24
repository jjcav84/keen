#!/usr/bin/env bash
curl -X PUT "https://staging-api.keen.io/3.0/projects/<PROJECT_ID>/queries/saved/cq-count-1" \
-H "Authorization: <MASTER_KEY>" \
-H "Content-Type: application/json" \
-d '{
        "refresh_rate": 14400,
        "query": {
            "analysis_type": "sum",
            "target_property": "client",
            "event_collection": "client",
            "timeframe": "this_22_weeks",
            "timezone": "UTC",
            "group_by": [
                "client"
            ]
        }
    }' | python -m json.tool