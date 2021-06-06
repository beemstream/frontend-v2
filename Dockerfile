FROM node:14.15.4-alpine as builder

WORKDIR /app

RUN npm install -g nx@12.3.3 && apk add gzip

COPY package*.json /app/

RUN npm i

COPY ./ /app/

RUN nx build --prod

RUN gzip -k /app/dist/apps/platform/*.*

FROM nginx:1.19.0

COPY nginx.conf /etc/nginx/nginx.conf

COPY robots.txt /usr/share/nginx/html/robots.txt

COPY sitemap.xml /usr/share/nginx/html/sitemap.xml

COPY --from=builder /app/dist/apps/platform/ /usr/share/nginx/html

EXPOSE 80
