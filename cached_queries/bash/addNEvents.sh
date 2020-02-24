#!/usr/bin/env bash
ENDRANGE=$1
for ((i = 1; i <= $ENDRANGE; i++))
do
let VALUE=$i\*2
printf "\n$VALUE added\n"
curl https://staging-api.keen.io/3.0/projects/<PROJECT_ID>events/client \
    -H 'Authorization: <WRITE_KEY>' \
    -H 'Content-Type: application/json' \
    -d '{
      "client": '$VALUE'
    }'
done