#!/usr/bin/python
import csv
import keen
import json
import time

# A working script for programmatically deleting events based on a list of keen.ids

# Ex of a file where you assign a variable to the file path where a list of given keen_ids lives
jorges_file = '/Users/jacobcavazos/keen-se-work/delete-duplicates-script/jorges_file.csv'

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
    keen.project_id = "5e4c0ac3c9e77c000184573c"
    keen.read_key = "E467B41C1995485B8BDEB88C8D2749350047164C8C82981ACCA627011A27A0A14CE492A18A2FB62B235815DB263FDFD5252F0763C5966D1E5F686DF3AA44612AA787D957BAEF52E6BF1279E1CDD3FC39BA6D4C552B5E37AA3478DAFE1955468F"
    keen.master_key= "E57DB258DCB36A507E2590E12693076074FD5E233655181F70F5A8D0B7B0A16A"
    keen.write_key="01A0533359D334B85312FF27A4ABFE9C5DAD575718B2D2B3122948FB23E10A81C4A19B3E30BE86B94230792CD2392023CA33741F3E33A098874B922A688FF56329E704E4CA06161AE6E1DAB7099C736F0FBB2EEBDEABEF8EC12770A8B40E46C9"

    prop_keen = keen.delete_events("duplicate_001",
        timeframe="this_14_days",
        filters=[{
        "operator":"eq",
        "property_name":"keen.id",
        "property_value": "{0}".format(keenid_details)
        }])
    return prop_keen

if __name__ == '__main__':
    read_file(jorges_file)
    for line in info:
        print(json.dumps(action_delete(line), indent=4))
        time.sleep(7)