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
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
