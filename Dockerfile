FROM node:12-alpine
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]