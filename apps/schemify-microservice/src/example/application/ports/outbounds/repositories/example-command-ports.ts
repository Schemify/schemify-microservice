import { ExampleEntity } from '@example//example/domain/entities/example.entity'

/**
 * 🔹 Puerto de salida para creación de ExampleEntity
 */
export abstract class CreateExamplePort {
  abstract create(entity: ExampleEntity): Promise<ExampleEntity>
}

/**
 * 🔹 Puerto de salida para actualización de ExampleEntity
 */
export abstract class UpdateExamplePort {
  abstract update(entity: ExampleEntity): Promise<void>
}

/**
 * 🔹 Puerto de salida para eliminación de ExampleEntity
 */
export abstract class DeleteExamplePort {
  abstract delete(id: string): Promise<void>
}
