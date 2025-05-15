import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetExampleByIdQuery } from './get-example-by-id.query'
import { Inject, NotFoundException } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'

@QueryHandler(GetExampleByIdQuery)
export class GetExampleByIdHandler
  implements IQueryHandler<GetExampleByIdQuery>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(query: GetExampleByIdQuery): Promise<any> {
    const entity = await this.repository.findById(query.payload.id)
    if (!entity) {
      throw new NotFoundException(
        `Example with id ${query.payload.id} not found`
      )
    }
    return entity
  }
}
