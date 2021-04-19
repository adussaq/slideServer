FROM node:14

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update
RUN npm install forever -g 
RUN npm install forever-monitor
COPY . .

EXPOSE 80

CMD node /app/server/index.js