# Development version
FROM node:16 AS dev

WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm ci

# Production version
FROM node:16-slim as prod

WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .

EXPOSE 8081
CMD ["node", "src/server.js"]