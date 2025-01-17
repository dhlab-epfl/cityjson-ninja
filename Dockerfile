# from https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html?redirect=true
# build stage
FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
# if --build-arg IS_DOCKER_COMPOSE=1, set NODE_ENV to 'docker-compose', otherwise defaults to 'dev'
# NODE_ENV is used by parcel-bundler to determin which ".env.XX" files to load
# namely, we use it to load the ".env.docker-compose" file which has the dockerized api url
# see https://en.parceljs.org/env.html
ARG IS_DOCKER_COMPOSE=""
RUN echo "IS_DOCKER_COMPOSE: $IS_DOCKER_COMPOSE"
ENV NODE_ENV=${IS_DOCKER_COMPOSE:+docker-compose}
ENV NODE_ENV=${NODE_ENV:-dev}
RUN echo "NODE_ENV: $NODE_ENV"

RUN yarn run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t hcj-frontend .
# docker run --rm -p 3000:80 hcj-frontend
