import { ExampleEntity } from '@example/example/domain/entities/example.entity'

/**
 * 🔹 Puerto de salida para obtener un Example por su ID
 */
export abstract class GetExampleByIdPort {
  abstract getById(id: string): Promise<ExampleEntity | null>
}

/**
 * 🔹 Puerto de salida para obtener todos los Example
 * 🚨 Usar solo en volúmenes bajos
 */
export abstract class GetAllExamplesPort {
  abstract getAll(): Promise<ExampleEntity[]>
}

/**
 * 🔹 Puerto de salida para obtener paginación por cursor
 */
export abstract class GetExamplesWithCursorPort {
  abstract getWithCursor(
    afterId: string,
    limit: number
  ): Promise<{
    items: ExampleEntity[]
    nextCursor: string | null
    hasMore: boolean
  }>
}
