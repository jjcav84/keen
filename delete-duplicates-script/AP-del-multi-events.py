#!/usr/bin/python
import csv
import keen
import json
import time

# A working script for programmatically deleting events based on a list of keen.ids

# Ex of a file where you assign a variable to the file path where a list of given keen_ids lives
keen_ids_file = '/Users/jacobcavazos/keen-se-work/delete-duplicates-script/ids_file.csv'

# Assign an variable to append the list from a csv file
info = []

# Reads in file and pulls out org_id
def read_file(csv_file):
    with open (csv_file, 'r') as f:
        csv_reader = csv.DictReader(f)

# Loop through the list of Keen_id and append to our info var
        for line in csv_reader:
            keen_ids = line['Keen_id']
            info.append(keen_ids)

# Create a function that iterates through the list of items on the csv and repeats the keen.delete api call after sleeping for seven seconds
def action_delete(keenid_details):
    keen.project_id = "PROJECT_ID"
    keen.read_key = "READ_KEY"
    keen.master_key= "MASTER_KEY"
    keen.write_key="WRITE_KEY"

    prop_keen = keen.delete_events("duplicate_001",
        timeframe="this_14_days",
        filters=[{
        "operator":"eq",
        "property_name":"keen.id",
        "property_value": "{0}".format(keenid_details)
        }])
    return prop_keen

if __name__ == '__main__':
    read_file(keen_ids_file)
    for line in info:
        print(json.dumps(action_delete(line), indent=4))
        time.sleep(7)
