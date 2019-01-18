#!/bin/bash

set -eo pipefail

assume_role_in_release_account() {
  local account_scheme_url
  account_scheme_url="$( \
    cat cdflow.yml | grep account-scheme-url | sed 's/account-scheme-url: //' \
  )"

  local account_scheme
  account_scheme="$( aws s3 cp $account_scheme_url - )"

  local release_account_id
  release_account_id="$( \
    echo "$account_scheme" | jq -r '.accounts[."release-account"].id' \
  )"

  local caller_identity
  caller_identity=$(aws sts get-caller-identity)
  local identity_arn
  identity_arn=$(
    echo $caller_identity | jq -r '.Arn'
  )
  local session_name
  if [[ $identity_arn == *"assumed-role"* ]]; then
    session_name="$( \
      echo "$caller_identity" | jq -r '.Arn | split("/")'[-1] \
    )"
  else
    cut_name=${JOB_NAME:0:64}
    session_name=${cut_name//\//-}
  fi

  local assume_role_response
  assume_role_response="$(
    aws sts assume-role \
      --role-arn arn:aws:iam::$release_account_id:role/admin \
      --role-session-name ${session_name}
  )"
 
  eval "$( echo "$assume_role_response" | jq -r '
        "export AWS_ACCESS_KEY_ID=" + .Credentials.AccessKeyId + "\n" +
        "export AWS_SECRET_ACCESS_KEY=" + .Credentials.SecretAccessKey + "\n" +
        "export AWS_SESSION_TOKEN=" + .Credentials.SessionToken
      '
  )"
}

assume_role_in_release_account
eval "$( aws ecr get-login --no-include-email )"

