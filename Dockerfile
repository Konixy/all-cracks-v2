FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN apk update

RUN npm i --legacy-peer-deps --force

RUN cd /app/node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

ENV NODE_ENV production

EXPOSE 80

CMD [ "npx", "serve", "-s", "build", "-l", "80" ]