FROM nginx:alpine
COPY familybudget.com.conf /etc/nginx/conf.d/familybudget.com.conf
COPY dist/family-budget /usr/share/nginx/html/familybudget.com
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
