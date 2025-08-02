ARG NODE_IMAGE=node:22-bookworm
FROM ${NODE_IMAGE}

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
