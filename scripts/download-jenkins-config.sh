#!/bin/bash

set -eo pipefail

if [ -z "$EMAIL" ]; then
    echo '$EMAIL not set, please enter your Acuris email'
    read -p 'email? ' EMAIL
fi

if [ -z "$JENKINS_API_TOKEN" ]; then
    echo '$JENKINS_API_TOKEN not set, please enter your Jenkins API token'
    echo 'You can get this from:'
    echo
    echo "    https://jenkins.mergermarket.it/user/$EMAIL/configure"
    echo
    read -s -p 'jenkins token (will not echo)? ' JENKINS_API_TOKEN
fi

if [ -z "$COMPONENT_NAME" ]; then
    COMPONENT_NAME="$(                \
        git config remote.origin.url  \
        | awk -F '/' '{print $NF}'    \
        | awk -F '.git' '{print $1}'  \
    )"
fi

team="$( cat cdflow.yml | grep ^team: | awk -F ': ' '{print $NF}' )"

team_url="https://jenkins.mergermarket.it/job/$team"
component_url="$team_url/job/$COMPONENT_NAME"

jobs="$(                                  \
    curl -fsSu "$EMAIL:$JENKINS_API_TOKEN" \
        $component_url/api/json           \
    | jq -r '[.] + .jobs + .views | map(.url) | unique[]'
)"

for job in $jobs; do
    from="${job}config.xml"
    to="$(                                                    \
        echo "jenkins-config${job#$component_url}config.xml"  \
        | sed 's/\/job\//\//g'                                \
    )"
    echo downloading $from
    echo "    to $to"
    mkdir -p "$(dirname $to)"
    curl -fsSu "$EMAIL:$JENKINS_API_TOKEN" -o "$to" "$from"
done
