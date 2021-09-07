FROM node:14.17.1 as build

ARG BUILD_CONTEXT

WORKDIR /base
RUN yarn set version berry
COPY package.json .
COPY .yarnrc.yml .
COPY .lerna.json .
COPY yarn.lock .
COPY ./$BUILD_CONTEXT/package.json ./$BUILD_CONTEXT/
RUN yarn install

COPY ./$BUILD_CONTEXT ./$BUILD_CONTEXT
COPY ./common ./common

RUN yarn build:$BUILD_CONTEXT

CMD ["node", "dist/", "daemon off;"]
