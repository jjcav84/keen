#!/usr/bin/env bash
curl https://api.keen.io/3.0/projects/5ea22ee63f1d39760b5d77fd/queries/extraction \
  -H "Authorization: c0f614df00724116fc06490d2f54df60845849a84080e1bca7ec6da4c7dab0eb1e37ab6fd492efe00734305a72ffaf8f1bebf3dacff572325ce5c7331dc929185d864f4daebe8ff645ca89961d1e78b9da32bf589627d07eaa7320a665931e85" \
  -H 'Content-Type: application/json' \
  -d "{
    \"event_collection\": \"Sendgrid Email Events\",
    \"timeframe\": \"this_28_days\",
    \"email\": \"jacob.cavazos@keen.io\"
  }"