#!/bin/bash
NODES=$1
CLUSTER_ID="EmptNWtoR4GGWx-BH6nGLQ"
NETWORK="schemify-nestjs_schemify-kafka-net"


PROJECT_ROOT=$(realpath "$(dirname "$0")/..")


# Crear estructura de directorios
mkdir -p $PROJECT_ROOT/deployments/docker/messages/kafka
cd $PROJECT_ROOT/deployments/docker/messages/kafka

echo "Creando configuración de cluster Kafka con $NODES nodos..."
echo "Directorio de trabajo: $(pwd)"

# Generar archivo docker-compose.yml
cat <<EOF > docker-compose.yml
version: '3.8'

networks:
  $NETWORK:
    external: true
  kafka-net:
    driver: bridge

services:
EOF

# Generar nodos Kafka
for i in $(seq 1 $NODES); do
  BROKER_PORT=$((9090 + $i * 2))
  CTRL_PORT=$((9091 + $i * 2))
  
  # Crear directorio de datos para cada nodo
  mkdir -p kafka$i/data
  
  cat <<EOF >> docker-compose.yml
  kafka$i:
    image: confluentinc/cp-kafka:7.8.0
    container_name: kafka$i
    hostname: kafka$i
    ports:
      - "$BROKER_PORT:9092"
      - "$CTRL_PORT:9093"
    volumes:
      - ./data/kafka$i/data:/var/lib/kafka/data
    environment:
      # 🧠 Identificación del broker
      KAFKA_NODE_ID: $i
      KAFKA_BROKER_ID: $i
      CLUSTER_ID: '$CLUSTER_ID'

      # 🧠 Roles y quorum (modo KRaft sin ZooKeeper)
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '$(seq -s, 1 $NODES | sed "s/\([0-9]\+\)/\1@kafka\1:9093/g")'

      # 🌐 Configuración de listeners (exposición y conexiones)
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka$i:9092'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'

      # 🛡️ Seguridad y consistencia de replicación
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: $NODES
      KAFKA_DEFAULT_REPLICATION_FACTOR: $NODES
      KAFKA_MIN_INSYNC_REPLICAS: 2

      # ⚡ Tiempo inicial de espera para rebalanceo
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0

      # 🛡️ Límite recomendado: 1 MB
      KAFKA_MESSAGE_MAX_BYTES: 1048576
      KAFKA_REPLICA_FETCH_MAX_BYTES: 1048576
      KAFKA_MAX_REQUEST_SIZE: 1048576
    networks:
      - kafka-net
      - $NETWORK

EOF
done

# Concatenar lista de bootstrap servers dinámicamente
BOOTSTRAPSERVERS=$(seq -s, 1 $NODES | sed "s/\([0-9]\+\)/kafka\1:9092/g")

# Agregar kafka-ui
cat <<EOF >> docker-compose.yml
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-cluster-ui
    ports:
      - "8081:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: $BOOTSTRAPSERVERS
    depends_on:
EOF

for i in $(seq 1 $NODES); do
  echo "      - kafka$i" >> docker-compose.yml
done

cat <<EOF >> docker-compose.yml
    networks:
      - kafka-net
      - $NETWORK
EOF

echo "✅ Configuración generada en: $PROJECT_ROOT/deployments/docker/messages/kafka/docker-compose.yml"
echo "Para iniciar el cluster ejecuta: "
echo ""
echo "docker-compose -f /deployments/docker/messages/kafka/docker-compose.yml up -d --build"
echo ""