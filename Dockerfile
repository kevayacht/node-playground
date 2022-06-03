FROM node:16.15-alpine

# set current work dir
WORKDIR /node-playground

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "start"]
