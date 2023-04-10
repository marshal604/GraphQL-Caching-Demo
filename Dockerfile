# 啟動 server
FROM node:18-alpine AS server
WORKDIR /server
COPY server/package.json .
RUN npm install
COPY server .
CMD ["node", "index.js"]

# 啟動 client
FROM node:18-alpine AS client
WORKDIR /client
COPY client/package.json .
RUN npm install
COPY client .
CMD ["npm", "start"]

