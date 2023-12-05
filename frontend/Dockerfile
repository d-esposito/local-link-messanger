# First Stage: Build Application
FROM node:20.5.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Second Stage: Serve Application
FROM nginx:1.23.1-alpine

EXPOSE 80

RUN touch /etc/nginx/conf.d/default.conf
RUN echo "server { \
            listen 80; \
            root /usr/share/nginx/html; \
            index index.html; \
            location / { \
                try_files $uri $uri/ /index.html; \
            } \
        }" >> /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html