import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllExamplesQuery } from './get-all-examples.query'
import { Inject } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'

@QueryHandler(GetAllExamplesQuery)
export class GetAllExamplesHandler
  implements IQueryHandler<GetAllExamplesQuery>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(): Promise<any> {
    return this.repository.findAll()
  }
}
