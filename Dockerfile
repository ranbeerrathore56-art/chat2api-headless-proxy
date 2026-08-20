FROM node:20-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm install ts-node -D

COPY . .

# Run via pure Node.js and ts-node to bypass all Bun edge cases
CMD ["node", "start-docker.js"]
