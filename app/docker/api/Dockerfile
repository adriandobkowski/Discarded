
FROM node:20-alpine
WORKDIR /srv

# Copy minimal package.json and install production deps locally so
# json-server-auth can require 'json-server' and 'express' successfully.
COPY docker/api/package.json ./
RUN npm install --production --no-audit --no-fund

RUN mkdir -p /seed /data
COPY db.json /seed/db.json

COPY routes.json /seed/routes.json

COPY docker/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

VOLUME ["/data"]

ENTRYPOINT ["/entrypoint.sh"]
