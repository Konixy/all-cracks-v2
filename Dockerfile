FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN apk update

RUN apk add git

RUN git clone "https://github.com/Konixy/all-cracks-v2" /app

RUN git pull

RUN npm i --legacy-peer-deps --force

RUN cd /node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build", "" ]