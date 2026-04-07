# ---- Build Stage ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_FARO_COLLECTOR_URL=""
ARG REACT_APP_API_BASE_URL="/api"
ENV REACT_APP_FARO_COLLECTOR_URL=${REACT_APP_FARO_COLLECTOR_URL}
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app && \
    chown -R app:app /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && chown app:app /var/run/nginx.pid

COPY --from=build --chown=app:app /app/build /usr/share/nginx/html
COPY --chown=app:app nginx.conf /etc/nginx/conf.d/default.conf

USER app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
