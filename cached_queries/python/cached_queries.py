from keen import KeenClient

client = KeenClient(
    project_id="",
    write_key="",
    read_key="",
    master_key="",
    base_url="https://staging-api.keen.io"  # It's STAGING ENV
)

# CACHED QUERY LIMITS
# Cached Queries must have a refresh_rate greater than 4 hours, and less than 24 hours.

# Max Query Response Time 5 minutes -> 300 seconds

cached_query_attributes = {
    "refresh_rate": 14400,
    "query": {
        "analysis_type": "average",
        "event_collection": "events",
        "target_property": "number",
        "timeframe": "this_3_years",
        "timezone": "UTC",
        "group_by": [
            "number"
        ]
    }
}
client.saved_queries.create("test-python-cq", cached_query_attributes)
