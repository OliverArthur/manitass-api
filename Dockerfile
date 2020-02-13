FROM node:13.8.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . ./usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
