FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN apk update

RUN npm i -g npm@latest

RUN npm i --legacy-peer-deps --force

RUN cd /app/node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

# ENV NODE_ENV production

# EXPOSE 80

# CMD [ "npx", "serve", "-s", "build", "-l", "80" ]

RUN apk add certbot

RUN certbot --nginx -d all-cracks.fr -d www.all-cracks.fr --agree-tos -m konixy.p@gmail.com

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]