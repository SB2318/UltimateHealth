FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci || npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NEXT_PUBLIC_BASE_PATH=/web
COPY web/ ./
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ENV NEXT_PUBLIC_BASE_PATH=/web

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 5000

CMD ["npm", "start"]
