# Primero infra (Kafka)
docker-compose -f infra/kafka/docker-compose.kafka.yml up -d

# Desarrollo
docker-compose --env-file docker/schemify-microservice/.envs/.env.dev -f docker/schemify-microservice/docker-compose.dev.yml up

# Producción
docker-compose --env-file docker/schemify-microservice/.envs/.env.prod -f docker/schemify-microservice/docker-compose.prod.yml up -d
