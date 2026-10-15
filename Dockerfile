FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NEXT_BUILD_WORKERS=1
ENV NEXT_PRIVATE_WORKERS=1

# Install pnpm
RUN npm install -g pnpm

# Install dependencies directly inside builder stage
COPY web/package.json web/pnpm-lock.yaml web/pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY web/ ./

# Run production build
RUN pnpm run build && rm -rf .next/cache && pnpm prune --prod

# Production runner stage
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV PORT=5000
ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 5000

CMD ["pnpm", "start"]
