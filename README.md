# keen-training

The event.js file in the root folder is a very simple example no how to create an event stream with an example of how to configure the client with the project id as well as write API key. The project id and api key are not valid but are used for example. 

Make sure not to post active IDs or API keys to your public repositories and to regenerate your keys if you accidentally any active keys using the access tab in the specific project for your organization.

The purchase1.json file is a simple example of data for an event written in JSON. CSV files can also be used for batch data streaming.

## Assignment 1

The assignment-1 directory includes query requests to the API written in JavaScript as well as the responses that were returned in JSON.

## Assignment 2 

This repository contains JavaScript file that uses the keen-tracking package to stream in a single event to a sales_status collection. It will create the collection if the collection does not already exist in the organization’s project for which the credentials in the .env file have been configured. 

Be sure to note that this displays how to properly overwrite the keen.timestamp value which is created automatically whenever an event is streamed into Keen. If you don’t do this then it will be almost impossible to make use of the streamed batch data due to the fact that as Keen relies on event driven analytics not having the proper timestamp value for the date time data type will render your data nearly or completely useless. As shown create a keen property and nest the timestamp property within the keen property so that it created a keen.timestamp property. This will allow for the timestamps from the JSON file to overwrite the automatic assignment and as such to properly display the time series data. This is very useful for testing your data models as well as uploading any historic data that you may have from before you started using the Keen platform. If you have any questions about this please feel free to contact me. 

## Assignment 3

The assignment-3 repository contains a JS file that will stream a single event as well as as a JSON file that I created with 100 data-objects containing the data values that correspond to the collection and properties created with the JavaScript file. 

The following keen-cli command was used to create a stream of 100 events from the JSON file. I removed whitespace from the JSON file to prep it for being used by the keen-cli. If you’re using newline delimited JSON files please use the same command. Note that you can also use event data in CSV form add a —csv flag. See the second command below for an example.

keen events:add -c sales_status --file events_100.json

keen events:add -c sales_status --file events_100.csv --csv


There is also a CSV file in repository-3 that was returned by running an extraction in the explorer as extractions are a very powerful tool for building out the data models that will best suit your specific use case.



