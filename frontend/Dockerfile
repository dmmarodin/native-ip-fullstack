FROM node:16 AS build-step

WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:1.21.1-alpine

COPY --from=build-step /home/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]