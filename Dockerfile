FROM node:18-alpine
WORKDIR /opt/app-dir
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]