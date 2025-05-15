import { ExampleEntity } from '../entities/example.entity'
export interface ExampleRepository {
  create(entity: ExampleEntity): Promise<ExampleEntity>
  update(id: string, entity: ExampleEntity): Promise<ExampleEntity>
  findById(id: string): Promise<ExampleEntity | null>
  findAll(): Promise<ExampleEntity[]>
  delete(id: string): Promise<void>
  findWithCursor(
    afterId: string,
    limit: number
  ): Promise<{
    items: ExampleEntity[]
    nextCursor: string | null
    hasMore: boolean
  }>
}
