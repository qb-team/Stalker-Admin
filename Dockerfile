FROM nginx
EXPOSE 80
EXPOSE 443
COPY /docs /usr/share/nginx/html
VOLUME /data/cert:/etc/nginx/certs
COPY /data/nginx.conf /etc/nginx/conf.d/nginx.conf