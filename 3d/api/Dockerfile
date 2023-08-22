FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --quiet

COPY . .

EXPOSE 8000

CMD [ "node", "src/index.js" ]
