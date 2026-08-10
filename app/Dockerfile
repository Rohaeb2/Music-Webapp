FROM node:20-alpine

WORKDIR /usr/src/app

RUN ls -la 

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install



COPY . .

EXPOSE 3000


CMD ["node" , "./app.js"]