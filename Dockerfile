FROM node:21-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=4000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@latest -g

USER node

WORKDIR /opt/app

COPY --chown=node:node package.json package-lock.json* tsconfig.json ./
RUN npm ci && npm cache clean --force
ENV PATH /opt/app/node_modules/.bin:$PATH

# HEALTHCHECK --interval=30s CMD node healthcheck.js

RUN mkdir src
COPY --chown=node:node ./src ./src

CMD [ "npm", "run", "prod" ]