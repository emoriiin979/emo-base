ARG BUN_IMAGE=oven/bun:1.2.21-debian
FROM ${BUN_IMAGE}

WORKDIR /app

RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev

COPY package.json .
RUN bun install

COPY . .
RUN bun run build

CMD ["bun", "run", "start"]
