FROM nginx:alpine
COPY fambudget.com /etc/nginx/conf.d/fambudget.com.conf
COPY --from=build /home/runner/work/Front-end/Front-end/dist/family-budget /usr/share/nginx/html/familybudget.com
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
