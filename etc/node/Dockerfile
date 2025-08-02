ARG NODE_IMAGE=node:22-bookworm
FROM ${NODE_IMAGE}

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
