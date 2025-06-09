# 🧱 Schemify Microservice – Docker Deployment Guide

Este documento describe cómo desplegar el microservicio `schemify-microservice` con Docker, incluyendo el entorno de infraestructura base (Kafka, PostgreSQL) y configuraciones para **desarrollo** y **producción**.

---

## 📁 Estructura del entorno

```bash
root/
├── apps/
│   └── schemify-microservice/
│       └── Dockerfile, Dockerfile.dev, prisma/, src/, ...
├── docker/
│   └── schemify-microservice/
│       ├── docker-compose.dev.yml
│       ├── docker-compose.prod.yml
│       ├── .envs/
│       │   ├── .env.dev
│       │   └── .env.prod
│       └── README.md ← este archivo
├── infra/
│   └── kafka/
│       ├── docker-compose.kafka.yml
│       └── kafka1-data/
```

---

## 🚀 Despliegue de infraestructura (Kafka)

Antes de levantar cualquier microservicio, debes levantar la infraestructura compartida:

```bash
docker-compose -f infra/kafka/docker-compose.kafka.yml up -d
```

Esto inicia:

* Kafka (modo KRaft)
* Kafka UI en [http://localhost:8081](http://localhost:8081)

`Recuerda crear los topics necesarios para tu microservicio en Kafka antes de iniciar el contenedor.`
* Puedes usar la UI de Kafka o comandos de consola para crear los topics.
* Ejemplo de creación de topic:

```bash
docker exec -it kafka1 kafka-topics --create --topic schemify-topic \
  --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

---

## 🧪 Despliegue en desarrollo

Levanta tu microservicio con su entorno de desarrollo (gRPC + PostgreSQL local):

```bash
docker-compose --env-file docker/schemify-microservice/.envs/.env.dev \
  -f docker/schemify-microservice/docker-compose.dev.yml up
```

Esto expone:

* Puerto gRPC en `localhost:50051`
* PostgreSQL accesible localmente en `localhost:5432`

---

## 🔐 Despliegue en producción

Para entorno productivo:

```bash
docker-compose --env-file docker/schemify-microservice/.envs/.env.prod \
  -f docker/schemify-microservice/docker-compose.prod.yml up -d
```

---

## 🔑 Variables de entorno

| Variable                  | Descripción                                       | Dev                         | Prod                    |
| ------------------------- | ------------------------------------------------- | --------------------------- | ----------------------- |
| `NODE_ENV`                | Entorno de ejecución (`development`/`production`) | `development`               | `production`            |
| `SERVICE_APP_NAME`        | Nombre de la app                                  | `schemify-microservice-dev` | `schemify-microservice` |
| `SERVICE_PORT`            | Puerto gRPC de la app                             | `50051`                     | `50051`                 |
| `SERVICE_GRPC_URL`        | Dirección gRPC                                    | `0.0.0.0:50051`             | `0.0.0.0:50051`         |
| `SERVICE_GRPC_PROTO_PATH` | Ruta a archivos `.proto`                          | `proto/src/services/`       | `proto/src/services/`   |
| `POSTGRES_USER`           | Usuario DB Postgres                               | `devuser`                   | `schemify_prod`         |
| `POSTGRES_PASSWORD`       | Contraseña DB Postgres                            | `devpass`                   | `strong_random_pass`    |
| `POSTGRES_HOST`           | Hostname del contenedor DB                        | `postgres`                  | `postgres`              |
| `POSTGRES_PORT`           | Puerto DB interno                                 | `5432`                      | `5432`                  |
| `POSTGRES_DB`             | Nombre de la base de datos                        | `schemifydb_dev`            | `schemifydb_prod`       |
| `DATABASE_URL`            | URL completa para Prisma/PostgreSQL               | `postgresql://...`          | `postgresql://...`      |

---

## 🧪 Tips de desarrollo

* Puedes ver el estado de Kafka con [Kafka UI](http://localhost:8081)
* Usa `npx prisma studio` si necesitas inspeccionar la base de datos visualmente
* El microservicio usa gRPC, no es necesario exponer puertos HTTP

---

## 🧩 ¿Más microservicios?

Sigue la misma estructura en `/apps/`, con su respectiva carpeta de Docker en `/docker/{nombre}/` y comparte la infraestructura común en `/infra/`.

---

## 🛠 Comandos útiles

```bash
# Apagar todos los contenedores
docker compose down

# Ver logs en tiempo real
docker compose logs -f schemify-microservice

# Borrar volúmenes de desarrollo
docker volume rm $(docker volume ls -qf dangling=true)
```

---

📌 *Última actualización: mayo 2025*
