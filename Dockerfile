FROM node:14.15.4-alpine as builder

WORKDIR /app

RUN npm install -g nx && apk add gzip

COPY package*.json /app/

RUN npm i

COPY ./ /app/

RUN nx build --prod

RUN gzip -k /app/dist/apps/platform/*.*

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/apps/platform/ /usr/share/nginx/html

EXPOSE 80
