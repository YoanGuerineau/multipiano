FROM node:lts-slim
WORKDIR /usr/src/multipiano
COPY . .
RUN npm ci

EXPOSE 3000
CMD [ "node", "index.js" ]