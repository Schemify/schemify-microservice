# 🧠 Capa de Aplicación - Microservicio `Example`

## 📌 Propósito de la capa de aplicación

La **capa de aplicación** orquesta el uso del dominio.
Su objetivo principal es **coordinar la ejecución de los casos de uso** del sistema, sin contener lógica de negocio propia.

### 🎯 Responsabilidades clave:

* Manejar **commands** (modifican el estado)
* Manejar **queries** (leen el estado)
* Manejar **eventos** del dominio
* Delegar toda la lógica al **dominio**
* No acceder a infraestructura directamente

## ⚙️ Principios aplicados

### ✅ CQRS (Command Query Responsibility Segregation)

* Separación estricta entre **escritura** (commands) y **lectura** (queries)
* Cada uno tiene su propio handler, interfaz y flujo

### ✅ Arquitectura hexagonal (Ports & Adapters)

* Usa **interfaces** de repositorio y servicios externos
* Todo lo externo se inyecta, no se usa directamente

### ✅ DDD Táctico

* Los handlers usan el **dominio** como autoridad de negocio
* Los comandos y queries son **intenciones expresadas por el usuario**

## 🧱 Estructura de carpetas

```txt
📁 application
├── 📁 commands                  → Casos de uso que modifican el sistema (write)
│   ├── 📁 create-example
│   │   ├── create-example.command.ts
│   │   └── create-example.handler.ts
│   ├── 📁 update-example
│   │   ├── update-example.command.ts
│   │   └── update-example.handler.ts
│   ├── 📁 delete-example
│   │   ├── delete-example.command.ts
│   │   └── delete-example.handler.ts
│   └── index.ts                → Exporta y registra todos los handlers

├── 📁 queries                   → Casos de uso que consultan el sistema (read)
│   ├── 📁 get-all-examples
│   ├── 📁 get-example-by-id
│   └── 📁 get-examples-by-cursor
│   └── index.ts                → Exporta y registra todos los handlers

├── 📁 events                   → EventHandlers que escuchan eventos del dominio
│   ├── 📁 example-created
│   ├── 📁 example-renamed
│   └── 📁 example-description-updated
│   └── index.ts                → Agrupa los EventHandlers

├── 📁 mappers                  → Adaptadores de entidades del dominio a DTOs (proto/HTTP/etc.)
│   └── example.mapper.ts
```

## 🧠 Qué hace cada componente

### 🔹 Commands

* Representan una **intención de cambio** del sistema (ej: "crear usuario")
* Se ejecutan mediante el `CommandBus`
* Se implementan con `ICommandHandler<Command>`

### 🔹 Queries

* Representan una **petición de datos** (ej: "obtener lista de ejemplos")
* Se ejecutan mediante el `QueryBus`
* Se implementan con `IQueryHandler<Query>`

### 🔹 Events

* Reaccionan a **eventos del dominio** ya emitidos (ej: `UserCreatedEvent`)
* Ejecutan efectos secundarios (notificaciones, logs, integración)
* No modifican entidades directamente

### 🔹 Mappers

* Transforman entidades del dominio (`ExampleEntity`) a objetos de transporte (Protobuf, DTO)
* También convierten de entrada externa (HTTP/gRPC) a `ValueObjects` o estructuras internas

## 🔄 Flujo típico de cada caso de uso

### 📤 Command

```txt
HTTP / GRPC
   ↓
DTO / Payload
   ↓
CommandBus.execute(command)
   ↓
CommandHandler
   ↓
→ DomainEntity.create() / .update()
   ↓
→ Repositorio de escritura
   ↓
→ EventBus.commit() → DomainEvents
```

### 📥 Query

```txt
HTTP / GRPC
   ↓
QueryBus.execute(query)
   ↓
QueryHandler
   ↓
→ Repositorio de lectura
   ↓
→ Mapper (domain → DTO / Protobuf)
   ↓
→ Devuelve al cliente
```

## 🧼 Buenas prácticas

| Recomendación                             | Descripción                                         |
| ----------------------------------------- | --------------------------------------------------- |
| ❌ No usar lógica de negocio en handlers   | Toda lógica debe estar en la entidad (dominio)      |
| ✅ Usar CommandBus y QueryBus              | Evita acoplar capas entre sí                        |
| ✅ Separar cada caso de uso en su carpeta  | Mantiene claridad y escalabilidad                   |
| ✅ Validar entidades con ValueObjects      | Evita ifs en handlers                               |
| ✅ Mapper = solo en aplicación             | Nunca devolver entidades a transporte directamente  |
| ❌ No usar decoradores de controlador aquí | `@Controller`, `@Injectable` solo donde corresponde |

## 🔍 Referencias oficiales

📚 CQRS en NestJS

> [https://docs.nestjs.com/recipes/cqrs](https://docs.nestjs.com/recipes/cqrs)

📚 CQRS en Azure Architecture

> [https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)

📚 Event Sourcing + CQRS - Greg Young

> [https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf)

## 🚀 ¿Por dónde comenzar?

1. ✍️ Crea el `Command` o `Query` según el caso de uso
2. 🧠 En el handler, llama a métodos del dominio (`entity.create()`, etc.)
3. 💾 Persiste usando el repositorio correspondiente
4. 📤 Usa mappers si vas a devolver algo al cliente
5. 🪝 En caso de eventos emitidos, crea los `EventHandlers` necesarios

---

> La capa de aplicación **es el pegamento entre el mundo externo y el dominio interno**, pero nunca debe tomar decisiones por sí sola.
> Solo coordina lo que el dominio define como permitido.
