#!/bin/bash

echo "Starting Elasticsearch in the background..."
/usr/local/bin/docker-entrypoint.sh eswrapper &

echo "Waiting for Elasticsearch to be available..."

# Loop to check if Elasticsearch is running
until $(curl --output /dev/null --silent --head --fail http://localhost:9200); do
    printf '.'
    sleep 5
done

echo -e "\nElasticsearch is operational."

# Set the password for the 'elastic' user
# The password is read from an environment variable
echo "Setting password for 'elastic' user..."
response=$(curl -X POST "localhost:9200/_security/user/elastic/_password" -H "Content-Type: application/json" -d'
{
  "password" : "'"${ELASTIC_PASSWORD}"'"
}' -w "\n%{http_code}" -s)

echo "Password change request response: $response"

# Check if the request was successful
http_status=$(echo $response | tail -n1)
if [ "$http_status" -eq 200 ]; then
    echo "Password for 'elastic' user successfully set."
else
    echo "Failed to set password for 'elastic' user. HTTP status code: $http_status"
fi

# Keep the Elasticsearch process in the foreground so the container does not exit
wait