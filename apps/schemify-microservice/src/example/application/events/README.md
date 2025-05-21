
## 📖 Events - Capa de Aplicación (CQRS)

## 📌 ¿Qué es un EventHandler en CQRS?

Un **EventHandler** es un componente que **escucha eventos de dominio emitidos** por las entidades o agregados del sistema, y reacciona a ellos sin modificar el estado del dominio directamente.

Forma parte del patrón **CQRS (Command Query Responsibility Segregation)** y de la **arquitectura basada en eventos**, donde los cambios importantes en el dominio se expresan como hechos.

---

### 🔄 ¿Cómo fluye un evento?

1. Se ejecuta un **Command**
2. El dominio emite un evento con `this.apply(...)`
3. Se invoca `commit()` en la entidad
4. NestJS propaga el evento al `EventBus`
5. Todos los `EventHandlers` registrados para ese evento se ejecutan

---

## 🎯 ¿Qué problema resuelve el uso de eventos?

* Desacopla los efectos secundarios de las acciones principales
* Permite **reaccionar a cambios** sin acoplar directamente servicios o clases
* Facilita la **integración con otros sistemas**: Kafka, Webhooks, Logs, Auditoría, etc.
* Permite que el dominio permanezca **puro**, delegando efectos a la aplicación

---

### ✔️ Ventajas de manejar eventos

| Ventaja                         | Explicación                                              |
| ------------------------------- | -------------------------------------------------------- |
| 📦 Bajo acoplamiento             | Permite agregar nuevas reacciones sin cambiar el dominio |
| 📡 Integración externa fácil     | Notificaciones, colas, analítica, side-effects           |
| ♻️ Reusabilidad y extensibilidad | Se pueden crear múltiples handlers para un mismo evento  |
| 🧪 Testabilidad                  | Los efectos secundarios se testean aislados              |

## 🧠 Implementación en microservicios con DDD + Hexagonal

### 🔹 ¿Dónde se ubica?

```txt
📦 application
└── 📁 events
     └── 📁 example-created
         └── example-created-event.handler.ts
     └── 📁 example-renamed
         └── example-renamed-event.handler.ts
     └── 📁 example-description-updated
         └── example-description-updated-event.handler.ts
     └── index.ts
```

### 🔹 ¿Qué hace el EventHandler?

1. Escucha un evento de dominio (ej. `ExampleCreatedEvent`)
2. Ejecuta efectos secundarios (publicar, loguear, notificar)
3. No modifica entidades ni reglas de negocio
4. No accede a infraestructura directamente (debe delegar a servicios si es necesario)

## 🧱 Ejemplo base para comenzar

### 🧩 Estructura sugerida

```txt
📦 application
└── 📁 events
     └── 📁 user-renamed
         └── user-renamed-event.handler.ts
```

### 🔧 Código base reutilizable

#### `user-renamed-event.handler.ts`

```ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { UserRenamedEvent } from '@/domain/events/user-renamed.event'

@EventsHandler(UserRenamedEvent)
@Injectable()
export class UserRenamedEventHandler
  implements IEventHandler<UserRenamedEvent>
{
  async handle(event: UserRenamedEvent): Promise<void> {
    console.log(`📝 User renamed: ${event.id} → ${event.newName.value}`)
    await Promise.resolve() // Evita warning si es async
  }
}
```

## ✅ Buenas prácticas para implementar EventHandlers

| Regla                                  | Recomendación ✅                                                |
| -------------------------------------- | -------------------------------------------------------------- |
| ❌ No modificar el dominio              | El evento ya ocurrió, no se debe revertir ni alterar el modelo |
| ❌ No acoplarse a Kafka, HTTP, DB       | Delegar a un servicio externo vía interfaz si es necesario     |
| ✅ Ser idempotente                      | Si se ejecuta dos veces, el resultado debe ser el mismo        |
| ✅ Hacer trabajo asincrónico controlado | Usar `await`, timeouts o colas si el trabajo es costoso        |
| ✅ Agrupar en `EventHandlers[]`         | Facilita el registro en el módulo NestJS                       |
| ✅ Separar handlers por evento          | Cada evento puede tener múltiples listeners independientes     |

## 🔍 Validación y referencias oficiales

📚 Recurso oficial de NestJS CQRS:

> [https://docs.nestjs.com/recipes/cqrs](https://docs.nestjs.com/recipes/cqrs)

📚 CQRS explicado por Microsoft:

> [https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)

📚 Greg Young (autor del patrón Event Sourcing):

> [https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf)

## 📦 Registro en el módulo

```ts
import { EventHandlers } from './application/events'

@Module({
  providers: [...EventHandlers],
})
export class UserModule {}
```

---

## 🧩 Cómo se conectan entre capas

```txt
CommandHandler
  └── entity.create()
          └── this.apply(new DomainEvent())
          └── entity.commit()
                  └── EventBus.publish()
                          └── EventHandler.handle()
```

---

> Los eventos **no son side-effects**:
> son hechos consumados que otros pueden observar para actuar en consecuencia.
