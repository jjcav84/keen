# keen-training

The event.js file in the root folder is a very simple example no how to stream in a single event. It includeds an example of how to configure the client with the project ID as well as write API key. The project id and api key are not valid but are used for example. The master API key also works but should not be used due to security best practices which require least permissions be used.

Make sure not to post active IDs or API keys to your public repositories (dev, test, staging, production environment or otherwise). If you do accidently post and of your keys that is ok as I have done this myself but please be sure to regenerate your keys when that happens. To do this through your keen account log and navigate to the corresponding project. Then click on the access tab in the specific project for your organization. There you will find a button that can regenerate your keys. After you regenerate the keys please be sure to update them in any code that you have which they have been embedded within.

The purchase1.json file is a simple example of dummy data for an event written in JSON. Please note that although I prefer to work with JSON that CSV files can also be used for batch data streaming with our SDKs that support this of which I prefer the keen-cli ruby gem so be sure to check that out as it has made my life quite a bit easier.

## Assignment 1

The assignment-1 directory includes query requests to the API written in JavaScript as well as the responses that were returned in JSON.

## Assignment 2

This repository contains a JavaScript file that uses the keen-tracking.js package. Again this script stream in Keen.io a single event to the sales_status event collection. It will create the event collection if the event collection does not already exist in the specific project for which the credentials in the .env file have been configured.

Be sure to note that this displays how to properly overwrite the keen.timestamp value which is created automatically whenever an event is streamed into Keen. If you do not do this it will be almost impossible to make use of the streamed batch data. This is due to the fact that Keen.io is made for time series event streams. Consequently not having the proper timestamp value for the keen.timestamp object which is of the datetime data type will effectively serve to render your data nearly or completely useless.

As shown create a keen property and nest the timestamp property within "keen" in your JSON so that it becomes a keen.timestamp object. This will allow for the timestamps from the JSON file to overwrite the platform's automatic assignment of a keen.timestamp. As such the data will now be properly formatted to be utilized as time series data. This is very useful for testing your data models with dummy data as well as uploading any historic data from before you started using Keen. If you have any questions about this please feel free to contact me. I know it can seem a bit convoluted and for most. Personally it was **_not_** readily apparent at first glance.

## Assignment 3

The assignment-3 folder contains a JavaScript file that will stream a single event into Keen. It also contains a JSON file that I created with 100 data-objects containing the data values that correspond to the event collection and properties created with the JavaScript file. Note that if the properties aren't the ones that have been created from the inital event created from the first file they will simply be added to the event collection as additional properties. The schemaless nature of Keen allows for this flexibility and for may different ways to strucutrue data most of which are **_NOT_** ideal. Please reach out to your Keen.io rep to help you get set up properly as early as possible when defining how you will structure your data to most effeciently make use of your resources when onboarding or when creating new solutions on top of Keen.

The following keen-cli command can be used in your terminal to create a stream of 100 events from the JSON file found within the assgnment-3 folder. I removed whitespace from the JSON file to prep it for being used by the keen-cli. If you’re using newline delimited JSON files please use the same command. Note that you can also use event data in CSV form by simply adding a csv flag to the command. See the second command example below for reference.

keen events:add -c sales_status --file events_100.json

keen events:add -c sales_status --file events_100.csv --csv

There is also a CSV file in repository-3 that was returned by running an extraction in the explorer as extractions are a very powerful tool for building out the data models that will best suit your specific use case.
