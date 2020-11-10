FROM node:10.15.3-alpine

WORKDIR /usr/app

COPY package*.json ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

HEALTHCHECK --interval=5s --timeout=5s --retries=3 CMD wget http://127.0.0.1:3112/healthcheck -q -O - > /dev/null 2>&1

CMD /wait && npm run dev
