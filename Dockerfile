FROM ubuntu:20.04 as build

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
    apt-get update && apt-get install apt-utils --yes && apt-get install -y curl --yes && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt-get install -y nodejs --yes

WORKDIR /app
ARG NPM_TOKEN

RUN echo Starting && \
    rm -rf node_modules

COPY package.json .
COPY package-lock.json .
RUN echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

RUN npm ci
RUN rm -f .npmrc

COPY . .

ENV NODE_ENV production

RUN npm run build

RUN touch releaseinformation.html

FROM node:14-alpine

ENV PORT 80
ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build --chown=root:root /app/node_modules ./node_modules
COPY --from=build /app/build build
COPY --from=build /app/config config
COPY --from=build /app/public public

COPY --from=build /app/releaseinformation.html .

ENTRYPOINT ["npm", "run", "serve"]
