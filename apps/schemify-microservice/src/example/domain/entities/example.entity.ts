import { AggregateRoot } from '@nestjs/cqrs'
import { v4 as uuidv4 } from 'uuid'

import { NameValueObject } from '../value-objects/name.value-object'
import { DescriptionValueObject } from '../value-objects/description.value-object'
import { ExampleCreatedEvent } from '../events/example-created.event'

interface Props {
  name: NameValueObject
  description?: DescriptionValueObject
  createdAt: Date
  updatedAt?: Date
}

export class ExampleEntity extends AggregateRoot {
  readonly id: string
  readonly props: Props

  private constructor(id: string, props: Props) {
    super()
    this.id = id
    this.props = props
  }

  // 🔹 Crear entidad desde la aplicación (emite evento)
  static create(input: { name: string; description?: string }): ExampleEntity {
    const entity = new ExampleEntity(uuidv4(), {
      name: NameValueObject.create(input.name),
      description: DescriptionValueObject.create(input.description),
      createdAt: new Date()
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

  // 🔹 Exportar para persistencia o eventos
  toPrimitives() {
    return {
      id: this.id,
      name: this.props.name.value,
      description: this.props.description?.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }

  // 🔹 Reconstruir desde persistencia (no emite eventos)
  static fromPrimitives(input: {
    id: string
    name: string
    description?: string
    createdAt: Date
    updatedAt?: Date
  }): ExampleEntity {
    return new ExampleEntity(input.id, {
      name: NameValueObject.create(input.name),
      description: DescriptionValueObject.create(input.description),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
