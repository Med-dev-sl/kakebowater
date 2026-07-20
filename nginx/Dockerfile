FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/cache/nginx && chmod -R 777 /var/cache/nginx
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
