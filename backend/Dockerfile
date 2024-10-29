FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV DATABASE_URL=postgresql://postgres:randompassword@localhost:5432/mydb?schema=public
ENV JWT_SECRET=JWTS3CR3T

COPY . .

CMD [ "npm", "run", "dev" ]