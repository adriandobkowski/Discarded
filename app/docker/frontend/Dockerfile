FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit

COPY . .

RUN npm run build -- --configuration production --output-path=dist-out \
 && rm -rf out \
 && mkdir -p out \
 && if [ -f dist-out/index.html ]; then \
      cp -R dist-out/* out/; \
    elif [ -f dist-out/browser/index.html ]; then \
      cp -R dist-out/browser/* out/; \
    else \
      echo "ERROR: Cannot find built index.html under dist-out"; \
      find dist-out -maxdepth 4 -type f -name index.html -print; \
      exit 1; \
    fi

FROM nginx:1.27-alpine

COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/out/ /usr/share/nginx/html/

EXPOSE 80
