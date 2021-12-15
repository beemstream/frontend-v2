FROM node:16.13.1-alpine as builder

WORKDIR /app

RUN npm install -g nx@13.3.4 && apk add gzip

COPY ./ /app/

RUN npm i

RUN nx build --configuration=production

RUN gzip -k /app/dist/apps/platform/*.*

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY robots.txt /usr/share/nginx/html/robots.txt

COPY sitemap.xml /usr/share/nginx/html/sitemap.xml

COPY --from=builder /app/dist/apps/platform/ /usr/share/nginx/html

EXPOSE 80
