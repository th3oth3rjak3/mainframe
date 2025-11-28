# Build stage
FROM node:22-alpine AS builder

# Install Rust and build dependencies
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN npm install -g pnpm && apk add --no-cache musl-dev

WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN pnpm install && pnpm run build

# Build backend
WORKDIR /app
RUN cargo build --release

# Runtime stage - tiny image with just the binary and static files
FROM alpine:latest

WORKDIR /app

# Copy only what we need to run
COPY --from=builder /app/target/release/mainframe ./
COPY --from=builder /app/static ./static

EXPOSE 8080

ENV RUST_LOG=info
ENV SQLX_OFFLINE=true

CMD ["./mainframe"]