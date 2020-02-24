from keen import KeenClient

client = KeenClient(
    project_id="",
    write_key="",
    read_key="",
    master_key="",
    base_url="https://staging-api.keen.io"  # It's STAGING ENV
)


class Event:
    @staticmethod
    def add_events():
        client.add_events({
            "signups": [
                {"username": "bob"},
                {"username": "mary"},
                {"username": "mary"},
                {"username": "mary"}
            ],
            "purchases": [
                {"price": 10},
                {"price": 20},
                {"price": 20},
                {"price": 30},
                {"price": 10}
            ],
            "events": [
                {"number": 123},
                {"number": 123},
                {"number": 523},
                {"number": 523},
                {"number": 523},
                {"number": 540},
                {"number": 540},
                {"number": 540},
                {"number": 140},
                {"number": 140},
                {"number": 140},
                {"number": 140},
                {"number": 140},
            ]
        })
