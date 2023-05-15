FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/runner/work/Front-end/Front-end/dist/family-budget /usr/share/nginx/html/familybudget.com
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
