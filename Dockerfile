FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install dependencies directly inside builder stage
COPY web/package.json web/package-lock.json ./
RUN npm ci

# Copy application source code
COPY web/ ./

# Run production build
RUN npm run build && rm -rf .next/cache && npm prune --production

# Production runner stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 5000

CMD ["npm", "start"]
