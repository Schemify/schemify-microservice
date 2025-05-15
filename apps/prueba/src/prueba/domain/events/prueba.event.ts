import { DescriptionValueObject } from '../value-objects/description.value-object'

export class PruebaCreatedEvent {
  public readonly occurredAt: Date
  public readonly id: string
  public readonly name: string
  public readonly description: DescriptionValueObject | null

  constructor(prueba: PruebaCreatedEvent) {
    this.occurredAt = new Date()
    this.id = prueba.id
    this.name = prueba.name
    this.description = prueba.description ?? null
  }
}
