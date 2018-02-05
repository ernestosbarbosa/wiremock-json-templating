#!/bin/bash
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu" ]]; then
    java -cp "local_libs/wiremock-standalone-2.14.0.jar:local_libs/wiremock-body-transformer-1.1.6.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner --verbose --local-response-templating --extensions com.opentable.extension.BodyTransformer --https-port 8081
elif [[ "$OSTYPE" == "win32" || "$OSTYPE" == "msys" ]]; then
	java -cp "local_libs/wiremock-standalone-2.14.0.jar;local_libs/wiremock-body-transformer-1.1.6.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner --verbose --local-response-templating --extensions com.opentable.extension.BodyTransformer --https-port 8081
else
    echo "Yo no lo coñosco señor..."
fi
