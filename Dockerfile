FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat ca-certificates
WORKDIR /app

ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NEXT_BUILD_WORKERS=1
ENV NEXT_PRIVATE_WORKERS=1
ENV NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/app/src/lib/fonts-mock.json

# Install pnpm
RUN npm install -g pnpm

# Install dependencies directly inside builder stage
COPY web/package.json web/pnpm-lock.yaml web/pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY web/ ./

# Run production build
RUN pnpm run build

# Production runner stage
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV PORT=5000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_PUBLIC_BASE_PATH=/web
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/messages ./messages

EXPOSE 5000

CMD ["node", "server.js"]
