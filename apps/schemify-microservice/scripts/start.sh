#!/bin/sh
set -e

echo "📦 Generando Prisma client..."
npx prisma generate --schema=prisma/schema.prisma

echo "🚀 Iniciando microservicio NestJS..."
npm run start:dev -- --project schemify-microservice
