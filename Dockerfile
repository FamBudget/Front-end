FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY fambudget.ddns.net.conf /etc/nginx/conf.d/fambudget.ddns.net.conf
COPY dist/family-budget /usr/share/nginx/html/fambudget.ddns.net
CMD ["nginx", "-g", "daemon off;"]
