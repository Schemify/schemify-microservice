
# 📖 Commands - Capa de Aplicación (CQRS)

## 📌 ¿Qué es un Command en CQRS?

Un **Command** es una operación de **escritura** que **modifica el estado** del sistema.

Forma parte del patrón **CQRS (Command Query Responsibility Segregation)**, el cual separa:

* 📤 **Commands** → Modifican el estado (escriben)
* 📥 **Queries** → Consultan el estado (leen)

---

## 🎯 ¿Qué problema resuelve CQRS?

En sistemas complejos:

* Mezclar lógica de lectura y escritura dificulta la escalabilidad, testing y mantenibilidad.
* CQRS permite **separar la intención de modificar del deseo de consultar**.

### ✔️ CQRS separa responsabilidades:

| Escritura (Command)         | Lectura (Query)             |
| --------------------------- | --------------------------- |
| Cambiar estado              | Consultar sin cambiar       |
| Foco en validaciones        | Alta performance            |
| Reglas de negocio estrictas | Indexado, paginación        |
| Transacciones consistentes  | Proyecciones denormalizadas |

---

## 🧠 Implementación en microservicios con DDD + Hexagonal

### 🔹 ¿Dónde se ubica?

```txt
📦 application
└── 📁 commands
     └──📁 <action-name>
        └── <action-name>.command.ts     → datos necesarios para modificar el estado
        └── <action-name>.handler.ts     → handler que ejecuta la acción
└── index.ts                          → exporta y registra los handlers
```

### 🔹 ¿Qué hace el handler?

1. Recibe un `Command` desde el `CommandBus`
2. Verifica y recupera entidades si es necesario
3. Llama a los métodos del dominio (`create`, `update`, etc.)
4. Persiste los cambios usando un repositorio de escritura
5. Emite eventos con `entity.commit()` si corresponde

## 🧱 Ejemplo base para comenzar

### 🧩 Estructura sugerida

```txt
📦 application
└── 📁 commands
     └── 📁 update-user
          └── update-user.command.ts
          └── update-user.handler.ts
```

### 🔧 Código base reutilizable

#### `update-user.command.ts`

```ts
import { ICommand } from '@nestjs/cqrs'

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string
  ) {}
}
```

#### `update-user.handler.ts`

```ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { UpdateUserCommand } from './update-user.command'

import { UserReadRepository } from '@/domain/repositories/user.read-repository'
import { UserWriteRepository } from '@/domain/repositories/user.write-repository'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('UserReadRepository')
    private readonly queryRepository: UserReadRepository,

    @Inject('UserWriteRepository')
    private readonly commandRepository: UserWriteRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.queryRepository.findById(command.id)

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`)
    }

    user.update({ name: command.name, email: command.email })

    await this.commandRepository.update(user)
    user.commit()
  }
}
```

## ✅ Buenas prácticas para implementar Commands

| Regla                                  | Recomendación ✅                                                           |
| -------------------------------------- | ------------------------------------------------------------------------- |
| ❌ No mezcles lógica de dominio         | Usa `user.update()` en lugar de modificar propiedades directamente        |
| ❌ No uses decoradores de controladores | Solo `@CommandHandler()`                                                  |
| ✅ Validar usando ValueObjects          | No aceptes datos inválidos en la entidad                                  |
| ✅ Separar repositorios de lectura      | Usa `ReadRepository` para leer y `WriteRepository` para persistir cambios |
| ✅ Usar eventos de dominio              | Aplica `entity.commit()` cuando hay cambios                               |
| ✅ Un caso de uso = un handler          | Mantén cada handler pequeño y enfocado                                    |

---

## 🔍 Validación y referencias oficiales

* Este patrón está alineado con las **recomendaciones de CQRS en NestJS**, que a su vez se basa en **DDD táctico**.

📚 Recurso oficial de NestJS CQRS:

> [https://docs.nestjs.com/recipes/cqrs](https://docs.nestjs.com/recipes/cqrs)

📚 CQRS explicado por Microsoft (concepto base):

> [https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)

📚 Greg Young (autor del patrón):

> [https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf)
