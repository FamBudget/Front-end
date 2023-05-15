FROM nginx:alpine
COPY fambudget.com.conf /etc/nginx/conf.d/fambudget.com.conf
COPY /home/runner/work/Front-end/Front-end/dist/family-budget /usr/share/nginx/html/familybudget.com
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
