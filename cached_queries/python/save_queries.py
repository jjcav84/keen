import json

# Configure a client instance for your project
from keen import KeenClient

client = KeenClient(
    project_id="",
    write_key="",
    read_key="",
    master_key="",
    base_url="https://staging-api.keen.io"  # It's STAGING ENV
)


def create_saved_query():
    saved_query_attributes = {
        "refresh_rate": 0,
        "query": {
            "analysis_type": "sum",
            "target_property": "price",
            "event_collection": "purchases",
            "timeframe": "this_2_weeks",
            "timezone": "UTC",
        },
        "metadata": {
            "display_name": "sq-sum",
        }
    }

    client.saved_queries.create("test-python-1", saved_query_attributes)


# CREATE SAVED QUERY

# create_saved_query()

# GET ALL SAVED QUERIES

# print(json.dumps(client.saved_queries.all(), indent=2))

# GET SINGLE SAVED QUERY

print(json.dumps(client.saved_queries.results("test-python-cq"), indent=3))

# GET SAVED QUERY DEFINITION

# print(json.dumps(client.saved_queries.get("cq-c"), indent=3))

# UPDATE

saved_query_attributes = {
    "refresh_rate": 0,
    "query": {
        "analysis_type": "sum",
        "target_property": "price",
        "event_collection": "purchases",
        "timeframe": "this_6_weeks",
        "timezone": "UTC",
    },
    "metadata": {
        "display_name": "test-python-update",
    }
}
# client.saved_queries.update("test-python-1", saved_query_attributes)

# DELETE

# client.saved_queries.delete("test-python-1")
