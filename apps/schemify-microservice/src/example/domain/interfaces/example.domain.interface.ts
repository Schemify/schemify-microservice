/**
 * Tipos que definen la estructura de los datos usados por la entidad Example
 */

import { NameValueObject } from '../value-objects/name.value-object'
import { DescriptionValueObject } from '../value-objects/description.value-object'

/**
 * Representa los campos actualizables de un Example.
 * Usado en métodos como `update()`, command handlers y DTOs.
 */
export type ExampleUpdateProps = {
  name?: string
  description?: string
}

/**
 * Representa todos los datos requeridos para construir un ExampleEntity
 * desde una fuente externa como la base de datos.
 */
export interface ExamplePrimitives {
  id: string
  name: string
  description: string | null | undefined
  createdAt: Date
  updatedAt?: Date
}

/**
 * Representa los datos internos encapsulados por la entidad,
 * tipados con Value Objects.
 */
export interface ExampleProps {
  name: NameValueObject
  description?: DescriptionValueObject
  createdAt: Date
  updatedAt?: Date
}
