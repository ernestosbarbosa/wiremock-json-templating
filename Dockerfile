FROM rodolpheche/wiremock:2.14.0

RUN mkdir -p /var/wiremock/extensions/ 
 
COPY local_libs/wiremock-body-transformer-1.1.6.jar /var/wiremock/extensions/

ADD __files/ /home/wiremock/__files/
ADD mappings/ /home/wiremock/mappings/

CMD ["java", "-cp", "/var/wiremock/lib/*:/var/wiremock/extensions/*", "com.github.tomakehurst.wiremock.standalone.WireMockServerRunner", "--local-response-templating", "--extensions", "com.opentable.extension.BodyTransformer", "--https-port", "8081"]