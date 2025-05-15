import { IEvent } from '@nestjs/cqrs'

import { DescriptionValueObject } from '../value-objects/description.value-object'
import { NameValueObject } from '../value-objects/name.value-object'

export class ExampleCreatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly name: NameValueObject,
    public readonly description?: DescriptionValueObject
  ) {}
}
