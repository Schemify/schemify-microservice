/**
 * ExampleEntity
 * -----------------------------------------------------------------------------
 * Esta clase representa la **entidad raíz del agregado** (Aggregate Root)
 * en el contexto del dominio de "Example".
 *
 * Forma parte central de la arquitectura DDD, encapsulando:
 *  - Estado (mediante value objects y propiedades internas)
 *  - Comportamiento (métodos como `create`, `update`)
 *  - Eventos de dominio (emitidos cuando hay cambios relevantes)
 *
 * 🔹 No conoce infraestructura (DB, ORM, HTTP)
 * 🔹 No expone datos primitivos directamente
 * 🔹 Se comunica mediante value objects y métodos bien tipados
 *
 * Esta entidad se usa dentro de:
 *  - Command Handlers (aplicación)
 *  - Repositorios (persistencia)
 *  - Servicios de dominio (si hay reglas transversales)
 *
 * Es construida mediante:
 *  - `create()` → cuando se crea un nuevo agregado (con eventos)
 *  - `fromPrimitives()` → cuando se reconstruye desde datos persistidos
 *
 * Es convertida a plano por:
 *  - `toPrimitives()` → para persistencia, serialización o transporte
 *
 * 🧠 Regla general: La entidad define lo que es **válido** en el dominio.
 */

import { AggregateRoot } from '@nestjs/cqrs'
import { v4 as uuidv4 } from 'uuid'

import { NameValueObject } from '../value-objects/name.value-object'
import { DescriptionValueObject } from '../value-objects/description.value-object'

import { ExampleCreatedEvent } from '../events/example-created.event'
import { ExampleRenamedEvent } from '../events/example-renamed.event'
import { ExampleDescriptionUpdatedEvent } from '../events/example-description-updated.event'

import {
  ExampleProps,
  ExamplePrimitives,
  ExampleUpdateProps
} from '../interfaces/example.domain.interface'

/**
 * Entidad raíz del agregado Example.
 * Encapsula reglas de negocio, estados y eventos.
 */
export class ExampleEntity extends AggregateRoot {
  constructor(
    public readonly id: string,
    public props: Readonly<ExampleProps>
  ) {
    super()
  }

  /**
   * Método fábrica para crear una nueva entidad con sus reglas e invariantes.
   * Dispara un evento de dominio ExampleCreatedEvent.
   */
  static create(input: { name: string; description?: string }): ExampleEntity {
    const now = new Date()

    const entity = new ExampleEntity(uuidv4(), {
      name: NameValueObject.create(input.name),
      description: DescriptionValueObject.create(input.description),
      createdAt: now,
      updatedAt: now
    })

    entity.apply(
      new ExampleCreatedEvent(
        entity.id,
        entity.props.name,
        entity.props.description
      )
    )
    return entity
  }

  /**
   * Método usado para reconstruir una entidad desde datos planos (ej: DB).
   * No dispara eventos.
   */
  static fromPrimitives(input: ExamplePrimitives): ExampleEntity {
    return new ExampleEntity(input.id, {
      name: NameValueObject.create(input.name),
      description: DescriptionValueObject.create(input.description),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt ?? input.createdAt
    })
  }

  /**
   * Devuelve una representación plana del estado de la entidad.
   * Útil para persistencia o serialización.
   */
  toPrimitives(): ExamplePrimitives {
    return {
      id: this.id,
      name: this.props.name.value,
      description: this.props.description?.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }

  /**
   * Actualiza propiedades de la entidad en base a los datos entrantes.
   * Solo aplica cambios si el valor realmente fue modificado.
   * Emite eventos por cada campo cambiado.
   */
  update(input: ExampleUpdateProps): void {
    const now = new Date()
    let changed = false
    const updated: ExampleProps = { ...this.props }

    const handlers = this.getUpdateHandlers(updated)

    Object.entries(input).forEach(([key, value]) => {
      const handler = handlers[key as keyof ExampleUpdateProps]
      if (handler && value !== undefined) {
        handler(value)
        changed = true
      }
    })

    if (changed) {
      updated.updatedAt = now
      this.props = updated
    }
  }

  /**
   * Retorna los métodos específicos que manejan cada campo actualizable.
   * Se usa internamente en `update()` para modularizar los cambios.
   */
  private getUpdateHandlers(
    updated: ExampleProps
  ): Record<keyof ExampleUpdateProps, (value: any) => void> {
    return {
      name: (value: string) => {
        const newName = NameValueObject.create(value)
        if (!this.props.name.equals(newName)) {
          updated.name = newName
          this.apply(new ExampleRenamedEvent(this.id, newName))
        }
      },
      description: (value: string) => {
        const newDesc = DescriptionValueObject.create(value)
        if (!this.props.description?.equals(newDesc)) {
          updated.description = newDesc
          this.apply(new ExampleDescriptionUpdatedEvent(this.id, newDesc))
        }
      }
    }
  }
}
