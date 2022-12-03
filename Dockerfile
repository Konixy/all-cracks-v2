FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN apk update

RUN cd /app/node_modules/react-tilted; touch index.d.ts; echo "declare module 'react-tilted';" > index.d.ts

RUN npm run build

# RUN npx tailwindcss build -i /build/index.scss -o main.css

ENV NODE_ENV production

EXPOSE 1000

CMD [ "npx", "serve", "-s", "build", "-l", "1000" ]

# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder /app/build .

# COPY /letsencrypt /etc/letsencrypt

# RUN apk add --update python3 py3-pip

# RUN apk add certbot

# RUN pip install certbot-nginx

# RUN certbot --nginx -d all-cracks.fr -d www.all-cracks.fr --agree-tos -m konixy.p@gmail.com

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]