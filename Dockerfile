FROM node:12-alpine
WORKDIR /backend
COPY . .
RUN npm install
CMD ["npm", "run", "start:dev"]