import { example } from '@app/proto'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

import { NameValueObject } from '@microservice/schemify-microservice/example/domain/value-objects/name.value-object'
import { DescriptionValueObject } from '@microservice/schemify-microservice/example/domain/value-objects/description.value-object'

export class ExampleMapper {
  protoToProps(proto: { name: string; description?: string }) {
    return {
      name: NameValueObject.create(proto.name),
      description: DescriptionValueObject.create(proto.description)
    }
  }

  entityToProto(entity: ExampleEntity): example.Example {
    return {
      id: entity.id,
      name: entity.props.name.value,
      description: entity.props.description?.value
    }
  }
}
