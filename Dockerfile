# Stage 1: Build React app
FROM node:22-alpine AS builder

WORKDIR /app

# Update base packages to fix security vulnerabilities
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY src/ ./src/
COPY public/ ./public/
COPY vite.config.js ./

# Build React app
RUN npm run build

# Stage 2: Production image (minimal)
FROM node:22-alpine

# Update base packages to fix security vulnerabilities
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# Security: run as non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY server.js ./

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["npm", "start"]
