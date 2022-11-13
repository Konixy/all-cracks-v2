FROM node:19-alpine as builder

WORKDIR /app

COPY ../home/All-Cracks .

RUN apk update

RUN cd /app/node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

# ENV NODE_ENV production

# EXPOSE 80

# CMD [ "npx", "serve", "-s", "build", "-l", "80" ]

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

ADD /etc/letsencrypt /etc/letsencrypt

# RUN apk add --update python3 py3-pip

# RUN apk add certbot

# RUN pip install certbot-nginx

# RUN certbot --nginx -d all-cracks.fr -d www.all-cracks.fr --agree-tos -m konixy.p@gmail.com

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]