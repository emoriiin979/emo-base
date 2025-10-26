ARG BUN_IMAGE
FROM ${BUN_IMAGE}

WORKDIR /app

RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev

COPY package.json .
RUN bun install

COPY . .
RUN bun run build

CMD ["bun", "run", "start"]
