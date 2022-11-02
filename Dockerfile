FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN apt update; apt full-upgrade; apt install git

RUN git config pull.rebase false

RUN git pull

RUN npm i --legacy-peer-deps --force

RUN cd /node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build", "" ]