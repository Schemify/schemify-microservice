import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetExamplesByCursorQuery } from './get-examples-by-cursor.query'
import { Inject } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'

@QueryHandler(GetExamplesByCursorQuery)
export class GetExamplesByCursorHandler
  implements IQueryHandler<GetExamplesByCursorQuery>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(query: GetExamplesByCursorQuery): Promise<any> {
    const { afterId, limit } = query.payload
    const { items, nextCursor, hasMore } = await this.repository.findWithCursor(
      afterId,
      limit
    )

    return {
      items,
      nextCursor,
      hasMore
    }
  }
}
