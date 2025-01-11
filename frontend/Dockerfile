FROM node:22-alpine AS build
WORKDIR /src
COPY package.json .
RUN npm install
COPY ./src .
RUN npm run build

FROM node:22-alpine
WORKDIR /src
COPY --from=build /src/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
