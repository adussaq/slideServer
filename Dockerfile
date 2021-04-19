FROM node:14

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update
RUN curl -LO https://github.com/adussaq/slideServer/archive/refs/heads/main.zip
RUN unzip main.zip
RUN npm install forever -g 
RUN npm install forever-monitor

CMD node ./slideServer-main/index.js

EXPOSE 80