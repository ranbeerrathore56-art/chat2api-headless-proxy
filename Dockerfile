FROM node:20-slim AS builder

WORKDIR /app
# We only need the backend parts
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# In this stage we will just run the server using tsx or bun
FROM oven/bun:1 AS runner

WORKDIR /app
COPY --from=builder /app /app

# Pre-configure the mock electron and start script
COPY mock-electron.ts ./
COPY preload-electron.ts ./
COPY start.ts ./

EXPOSE 8080

CMD ["bun", "--preload", "./preload-electron.ts", "start.ts"]
