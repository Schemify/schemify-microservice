# 📖 Queries - Capa de Aplicación (CQRS)

## 📌 ¿Qué es una Query en CQRS?

Una **Query** es una operación de **lectura** que obtiene datos del sistema sin modificarlos.

Forma parte del patrón **CQRS (Command Query Responsibility Segregation)**, el cual separa:

- 📤 **Commands** → Modifican el estado (escriben)
- 📥 **Queries** → Consultan el estado (leen)

---

## 🎯 ¿Qué problema resuelve CQRS?

En sistemas grandes o distribuidos:

- Mezclar lógica de lectura y escritura en los mismos servicios produce complejidad y coupling.
- CQRS permite **escalar, optimizar y organizar** mejor ambas operaciones.

### ✔️ CQRS separa responsabilidades:
| Lectura (Query)             | Escritura (Command)         |
| --------------------------- | --------------------------- |
| Consultar sin cambiar       | Cambiar estado              |
| Alta performance            | Foco en validaciones        |
| Indexado, paginación        | Reglas de negocio estrictas |
| Proyecciones denormalizadas | Transacciones consistentes  |

---

## 🧠 Implementación en microservicios con DDD + Hexagonal

### 🔹 ¿Dónde se ubica?

```txt
📦 application
└── 📁 queries
     └──📁 get-<query-name>
        └── get-<query-name>.query.ts     → objeto de query (parámetros)
        └── get-<query-name>.handler.ts   → handler con lógica de lectura
└── index.ts                          → exporta y registra los handlers

```

### 🔹 ¿Qué hace el handler?

1. Recibe una `Query` desde el `QueryBus`
2. Llama al repositorio de solo lectura (read-repository)
3. Aplica cualquier transformación (ej: mapper → DTO, Protobuf)
4. Devuelve el resultado a la capa de transporte (REST, GraphQL, gRPC)


## 🧱 Ejemplo base para comenzar

### 🧩 Estructura sugerida

```txt
📦 application
└── 📁 queries
     └── 📁 get-user-by-id
          └── get-user-by-id.query.ts
          └── get-user-by-id.handler.ts

```

### 🔧 Código base reutilizable

#### `get-user-by-id.query.ts`

```ts
import { IQuery } from '@nestjs/cqrs'

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly payload: { id: string }) {}
}
```

#### `get-user-by-id.handler.ts`

```ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { user } from '@/proto' 

import { GetUserByIdQuery } from './get-user-by-id.query'

import { UserReadRepository } from '@/domain/repositories/user.read-repository'
import { UserMapper } from '@/application/mappers/user.mapper'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('UserReadRepository')
    private readonly repository: UserReadRepository,

    private readonly mapper: UserMapper
  ) {}

  async execute(query: GetUserByIdQuery): Promise<user.User> {
    const entity = await this.repository.findById(query.payload.id)

    if (!entity) {
      throw new NotFoundException(`User ${query.payload.id} not found`)
    }

    return this.mapper.entityToProto(entity)
  }
}
```

## ✅ Buenas prácticas para implementar Queries

| Regla                                | Recomendación ✅                                                             |
| ------------------------------------ | --------------------------------------------------------------------------- |
| ❌ No usar lógica de negocio compleja | Queries deben ser simples y enfocadas en lectura                            |
| ❌ No modificar el estado del sistema | Si algo cambia, debe ser Command                                            |
| ✅ Usar `ReadRepositories` separados  | Nunca usar `WriteRepository` desde queries                                  |
| ✅ Mantener tipado fuerte             | Define tu propio tipo de retorno (ej: `user.User`, DTO, response interface) |
| ✅ Aplicar `Mapper` si devuelves DTOs | No devuelvas entidades del dominio directamente                             |
| ✅ Devolver errores claros            | Lanza `NotFoundException`, `BadRequestException` según sea necesario        |
| ✅ Separar carpetas por query         | Cada query debe vivir en su propio subdirectorio                            |


## 🔍 Validación y referencias oficiales

* Este patrón está alineado con las **recomendaciones de CQRS en NestJS**, que a su vez se basa en **DDD táctico**.

📚 Recurso oficial de NestJS CQRS:

> [https://docs.nestjs.com/recipes/cqrs](https://docs.nestjs.com/recipes/cqrs)

📚 CQRS explicado por Microsoft (concepto base):

> [https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)

📚 Greg Young (autor del patrón):

> [https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf)
