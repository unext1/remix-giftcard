#! /bin/bash

dir="$(dirname "${BASH_SOURCE[0]}")"

hasura --project $dir --envfile ../.env metadata reload
hasura --project $dir --envfile ../.env metadata ic list
hasura --project $dir --envfile ../.env console --no-browser
