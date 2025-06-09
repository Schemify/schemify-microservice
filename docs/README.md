http://localhost:8081/ui/clusters/local/all-topics/example-created/messages?keySerde=String&valueSerde=String&limit=100
```
└── 📁schemify-nestjs
     
    └── 📁.github
        └── 📁ISSUE_TEMPLATE
            └── bug_report.md
            └── documentation_task.md
            └── feature_request.md
            └── general_task.md
            └── user_story.md
        └── 📁PULL_REQUEST_TEMPLATE
            └── pull_request_template.md
    └── 📁.husky
        └── 📁_
            └── .gitignore
            └── applypatch-msg
            └── commit-msg
            └── h
            └── husky.sh
            └── post-applypatch
            └── post-checkout
            └── post-commit
            └── post-merge
            └── post-rewrite
            └── pre-applypatch
            └── pre-auto-gc
            └── pre-commit
            └── pre-merge-commit
            └── pre-push
            └── pre-rebase
            └── prepare-commit-msg
        └── commit-msg
        └── pre-commit
    └── 📁apps
        └── 📁prueba
            └── 📁docs
            └── 📁prisma
                └── 📁migrations
            └── 📁src
                └── 📁prueba
                    └── 📁infrastructure
                        └── 📁exceptions
                        └── 📁persistence
                            └── 📁mongodb
            └── 📁test
        └── 📁schemify-microservice
            └── Dockerfile
            └── Dockerfile.dev
            └── 📁docs
                └── README.md
            └── jest-e2e.config.ts
            └── package-lock.json
            └── package.json
            └── 📁prisma
                └── 📁migrations
                    └── 📁20250429013212_init
                        └── migration.sql
                    └── migration_lock.toml
                └── schema.prisma
            └── README.md
            └── 📁scripts
                └── start.sh
            └── 📁src
                └── app.module.ts
                └── 📁example
                    └── 📁application
                        └── application.module.ts
                        └── 📁ports
                            └── 📁inbounds
                                └── 📁commands
                                    └── 📁create-example
                                        └── create-example.command.ts
                                        └── create-example.handler.ts
                                    └── 📁delete-example
                                        └── delete-example.command.ts
                                        └── delete-example.handler.ts
                                    └── index.ts
                                    └── README.md
                                    └── 📁update-example
                                        └── update-example.command.ts
                                        └── update-example.handler.ts
                                └── 📁events
                                    └── example-created.event-handler.ts
                                    └── index.ts
                                └── 📁queries
                                    └── 📁get-all-examples
                                        └── get-all-examples.handler.ts
                                        └── get-all-examples.query.ts
                                    └── 📁get-example-by-id
                                        └── get-example-by-id.handler.ts
                                        └── get-example-by-id.query.ts
                                    └── 📁get-examples-by-cursor
                                        └── get-examples-by-cursor.handler.ts
                                        └── get-examples-by-cursor.query.ts
                                    └── index.ts
                                    └── README.md
                            └── 📁outbounds
                                └── 📁messaging
                                    └── example-event-publisher.port.ts
                                └── 📁repositories
                                    └── example-command-ports.ts
                                    └── example-query-ports.ts
                        └── README.md
                        └── 📁use-cases
                            └── 📁messaging
                                └── 📁kafka
                                    └── print-example-info.use-case.ts
                            └── use-cases.module.ts
                    └── 📁domain
                        └── 📁entities
                            └── example.entity.ts
                        └── 📁events
                            └── example-created.event.ts
                            └── example-description-updated.event.ts
                            └── example-renamed.event.ts
                            └── README.md
                        └── README.md
                        └── 📁value-objects
                            └── description.value-object.ts
                            └── name.value-object.ts
                    └── example.module.ts
                    └── 📁infrastructure
                        └── 📁adapters
                            └── adapters.module.ts
                            └── 📁inbounds
                                └── 📁grpc
                                    └── 📁command
                                        └── create-example.grpc.controller.ts
                                        └── delete-example.grpc.controller.ts
                                        └── index.ts
                                        └── update-example.grpc.controller.ts
                                    └── 📁config
                                        └── grpc-server.config.ts
                                    └── grpc-server.module.ts
                                    └── 📁query
                                        └── get-all-examples.grpc.controller.ts
                                        └── get-example-by-id.grpc.controller.ts
                                        └── get-examples-by-cursor.grpc.controller.ts
                                        └── index.ts
                                    └── README.md
                                └── inbounds.module.ts
                                └── 📁kafka
                                    └── 📁consumers
                                        └── example-created.consumer.ts
                                        └── index.ts
                                    └── kafka-consumer.module.ts
                            └── 📁outbounds
                                └── 📁kafka
                                    └── 📁client
                                        └── kafka-producer.service.ts
                                    └── kafka-producer.module.ts
                                    └── 📁producers
                                        └── index.ts
                                        └── kafka-example-events.publisher.ts
                                └── outbounds.module.ts
                                └── 📁prisma
                                    └── 📁command
                                        └── create-example.prisma.repository.ts
                                        └── delete-example.prisma.repository.ts
                                        └── index.ts
                                        └── update-example.prisma.repository.ts
                                    └── prisma.module.ts
                                    └── prisma.service.ts
                                    └── 📁query
                                        └── get-all-example.prisma.repository.ts
                                        └── get-example-by-id.prisma.repository.ts
                                        └── get-examples-with-cursor.prisma.repository.ts
                                        └── index.ts
                                    └── README.md
                        └── infrastructure.module.ts
                        └── 📁mappers
                            └── example.mapper.ts
                        └── 📁shared
                            └── 📁constants
                                └── proto-paths.ts
                            └── 📁interceptors
                                └── grpc-logging.interceptor.ts
                └── 📁health
                └── 📁interceptors
                └── 📁libs
                    └── 📁shared
                        └── 📁config
                            └── 📁kafka
                                └── kafka.config.ts
                        └── 📁events
                            └── event-envelope.ts
                        └── 📁interfaces
                            └── 📁pagination
                                └── cursor-result.interface.ts
                        └── shared.module.ts
                    └── tracing.ts
                └── main.ts
                └── 📁metrics
                └── 📁tracing
            └── 📁test
                └── example.dummy.ts
                └── grpc.e2e.spec.ts
            └── tsconfig.app.json
    └── 📁config
        └── 📁prometheus
            └── prometheus.yml
    └── 📁deployments
        └── 📁docker
            └── 📁databases
                └── 📁example
                    └── .env
            └── 📁messages
                └── 📁kafka
                    └── 📁kafka1
                        └── 📁data
    └── 📁docker
        └── 📁schemify-microservice
            └── 📁.envs
                └── .env.dev
                └── .env.example
                └── .env.prod
            └── docker-compose.dev.yml
            └── docker-compose.prod.yml
            └── README.md
    └── 📁docs
        └── README.md
    └── 📁infra
        └── 📁kafka
            └── docker-compose.kafka.yml
    └── 📁kreya
        └── 📁schemify-microservice-nestjs
            └── directory.krpref
            └── 📁example
                └── 📁ExampleService
                    └── createExample-request.json
                    └── createExample.krop
                    └── deleteExample-request.json
                    └── deleteExample.krop
                    └── getAllExamples-request.json
                    └── getAllExamples.krop
                    └── getExampleById-request.json
                    └── getExampleById.krop
                    └── getExamplesByCursor-request.json
                    └── getExamplesByCursor.krop
                    └── updateExample-request.json
                    └── updateExample.krop
            └── 📁prueba
                └── 📁PruebaService
                    └── CreatePrueba-request.json
                    └── CreatePrueba.krop
                    └── DeletePrueba-request.json
                    └── DeletePrueba.krop
                    └── GetAllPruebas-request.json
                    └── GetAllPruebas.krop
                    └── GetPruebaById-request.json
                    └── GetPruebaById.krop
                    └── UpdatePrueba-request.json
                    └── UpdatePrueba.krop
            └── schemify-microservice-nestjs.krproj
    └── 📁libs
        └── 📁observability
            └── index.ts
            └── 📁src
                └── index.ts
                └── 📁logging
                    └── logger.interceptor.ts
                └── 📁metrics
                    └── metrics.module.ts
                └── observability.module.ts
                └── 📁tracing
                    └── tracing.module.ts
            └── tsconfig.lib.json
        └── 📁proto
            └── 📁generated
                └── example.ts
                └── index.ts
                └── prueba.ts
            └── README.md
            └── 📁src
                └── 📁example
                    └── example.proto
                └── 📁prueba
                    └── prueba.proto
            └── tsconfig.lib.json
        └── 📁shared-kernel
            └── 📁example-mapping
                └── example.mapper.ts
    └── 📁scripts
        └── dev-up.sh
        └── generate-kafka-compose.sh
        └── init-microservice.sh
        └── init-proto.sh
        └── setup-husky.js
    └── .dockerignore
    └── .env
    └── .env.example
    └── .gitignore
    └── .prettierignore
    └── .prettierrc
    └── a..adoc
    └── commitlint.config.mjs
    └── eslint.config.mjs
    └── jest.config.ts
    └── LICENSE
    └── nest-cli.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.build.json
    └── tsconfig.json
```

npx protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/example.proto
Mover archivo resultante a libs/common/src/types

"compilerOptions": {
"tsConfigPath": "apps/schemify-microservice/tsconfig.app.json",
"assets": ["proto/*.proto"],
"watchAssets": true
}

🔒 Logger centralizado (por ejemplo con Pino) y redirección de logs Kafka a archivos o servicios externos.

$ docker tag schemify-microservice-schemify-microservice ixyz0/schemify-microservice:v0.1.0

docker push ixyz0/schemify-microservice:v0.1.0

https://hub.docker.com/repository/docker/ixyz0/schemify-microservice/general


helm create postgres-chart


comandos minikube

# Ver el estado de minikube
minikube status

# Encender minikube
minikube start

# Verificar los nodos
kubectl get nodes

cd schemify-microservice
mkdir deployments
cd deployments
helm create schemify-microservice

En clústers remotos (allí siempre necesitas subir la imagen a un registry como Docker Hub o GitHub Container Registry).

minikube start --addons=ingress

helm repo add kong https://charts.konghq.com
helm repo update

helm install kong kong/kong \
  --set ingressController.enabled=true \
  --set admin.type=NodePort \
  --set proxy.type=NodePort \
  --namespace kong --create-namespace

kubectl get svc -n kong

ver que ip expone minikube
minikube profile list
	minikube ip

  kubectl get svc

kubectl get endpoints httpbin-httpbin-chart


kubectl get pods

kubectl delete deployment httpbin

helm install httpbin ./httpbin-chart

helm uninstall httpbin --no-hooks

kubectl delete all -l app.kubernetes.io/instance=httpbin

kubectl delete deployment httpbin
kubectl delete pod -l app=httpbin
kubectl delete replicaset -l app=httpbin

kubectl delete all -l app=httpbin

sh.helm.release.v1.httpbin.v1
kubectl delete secret sh.helm.release.v1.httpbin.v1

helm list
kubectl get all | grep httpbin

curl http://<MINIKUBE_IP>:<KONG_NODEPORT>/httpbin/get
minikube ip


helm upgrade --install httpbin ./httpbin-chart

kubectl delete pod -l app.kubernetes.io/instance=httpbin

estado correctop
ixyz@kelsier:~/documents/deployments/minikube/deployments$ kubectl get deployment httpbin
kubectl get svc httpbin
kubectl get ingress httpbin
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
httpbin   1/1     1            1           33m
NAME      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
httpbin   ClusterIP   10.104.161.54   <none>        80/TCP    33m
NAME      CLASS   HOSTS   ADDRESS         PORTS   AGE
httpbin   kong    *       10.105.161.86   80      27m
ixyz@kelsier:~/documents/deployments/minikube/deployments$

ixyz@kelsier:~/documents/deployments/minikube/deployments$ kubectl get svc kong-gw-kong-proxy -n kong
NAME                 TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
kong-gw-kong-proxy   NodePort   10.105.161.86   <none>        80:30435/TCP,443:30118/TCP   21h
ixyz@kelsier:~/documents/deployments/minikube/deployments$

ixyz@kelsier:~/documents/deployments/minikube/deployments$ kubectl get pods -n kong -o wide
NAME                            READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
kong-gw-kong-797dcc6d66-nhsfk   2/2     Running   0          21h   10.244.0.51   minikube   <none>           <none>
kong-gw-postgresql-0            1/1     Running   0          21h   10.244.0.52   minikube   <none>           <none>
ixyz@kelsier:~/documents/deployments/minikube/deployments$

OpenTelemetry (OTel)	Librería/SDK que instrumenta tu app para capturar métricas, trazas, logs.	Genera datos de observabilidad
Prometheus	Servicio que recoge (scrapea) métricas desde tus apps.	Recolector y base de datos de métricas
Prometheus Exporter	Endpoint HTTP (/metrics) que expone las métricas para Prometheus.	Puente entre app y Prometheus
