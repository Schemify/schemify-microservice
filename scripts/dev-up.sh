#!/bin/bash
set -euo pipefail

# Colores
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
NC='\033[0m'

echo -e "${YELLOW}🔧 Levantando todos los docker-compose.yml encontrados...${NC}"

# Base del comando
CMD="docker compose"

# Busca todos los docker-compose.yml relevantes (excepto el orquestador raíz)
COMPOSE_FILES=$(find apps/ infra/ -type f -name 'docker-compose.yml' | sort)

# Agrega los -f dinámicamente
for file in $COMPOSE_FILES; do
  CMD="$CMD -f $file"
done

# Agrega el orquestador raíz (por si algún día se usa)
CMD="$CMD -f docker-compose.yml"

# Ejecuta con build
CMD="$CMD up --build"

echo -e "${GREEN}🚀 Ejecutando: $CMD${NC}"
eval $CMD
