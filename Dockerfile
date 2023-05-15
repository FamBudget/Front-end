FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/runner/work/Front-end/Front-end /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
