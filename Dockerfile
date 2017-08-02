FROM node:8-alpine

ENV ADDICT_VERSION 1.0.4

EXPOSE 3000
ENTRYPOINT [ "/usr/local/bin/addict" ]

RUN npm install "addict@$ADDICT_VERSION" -g \
        && npm cache clear --force
