/**
 * ExampleMapper
 * -----------------------------------------------------------------------------
 * Mapper responsable de transformar datos entre distintas capas del sistema:
 *
 *  - 🌐 Infraestructura (ej. Protobuf, HTTP, DB)
 *  - 🧠 Dominio (Entity + ValueObjects)
 *  - 🧱 Persistencia (Primitives)
 *
 * Este mapper aísla las conversiones para mantener los handlers y servicios limpios.
 */

import { example } from '@app/proto'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

import { NameValueObject } from '@microservice/schemify-microservice/example/domain/value-objects/name.value-object'
import { DescriptionValueObject } from '@microservice/schemify-microservice/example/domain/value-objects/description.value-object'

import {
  ExampleProps,
  ExamplePrimitives
} from '@microservice/schemify-microservice/example/domain/interfaces/example.domain.interface'

export class ExampleMapper {
  /**
   * Transforma un objeto recibido desde Protobuf a props del dominio.
   *
   * ✅ Se usa como entrada para `ExampleEntity.create(...)`
   * ✅ Valida automáticamente usando los ValueObjects
   *
   * @param proto Objeto recibido del cliente gRPC (ej: del controller)
   * @returns Props válidos para la entidad
   */
  protoToProps(proto: {
    name: string
    description?: string
  }): Omit<ExampleProps, 'createdAt' | 'updatedAt'> {
    return {
      name: NameValueObject.create(proto.name),
      description: DescriptionValueObject.create(proto.description)
    }
  }

  /**
   * Convierte una entidad del dominio a su representación Protobuf.
   *
   * ✅ Usado por handlers o resolvers gRPC para responder al cliente
   * ✅ No expone ValueObjects directamente
   *
   * @param entity Entidad del dominio
   * @returns Objeto Protobuf plano
   */
  entityToProto(entity: ExampleEntity): example.Example {
    if (!entity) {
      throw new Error('entityToProto: received undefined entity')
    }

    return {
      id: entity.id,
      name: entity.props.name.value,
      description: entity.props.description?.value
    }
  }

  /**
   * Convierte una entidad en un objeto plano (primitives) para persistencia.
   *
   * ✅ Usado por la capa de infraestructura para guardar en DB
   * ✅ Compatible con `ExampleEntity.fromPrimitives()`
   *
   * @param entity Entidad completa del dominio
   * @returns Objeto plano (primitives)
   */
  toPrimitives(entity: ExampleEntity): ExamplePrimitives {
    return entity.toPrimitives()
  }

  /**
   * Reconstruye una entidad del dominio desde un objeto plano (por ejemplo, desde la DB).
   *
   * ✅ Usado por repositorios al leer datos de persistencia
   * ✅ Reconstruye ValueObjects internamente
   *
   * @param input Datos planos persistidos
   * @returns Instancia válida de `ExampleEntity`
   */
  fromPrimitives(input: ExamplePrimitives): ExampleEntity {
    return ExampleEntity.fromPrimitives(input)
  }
}
