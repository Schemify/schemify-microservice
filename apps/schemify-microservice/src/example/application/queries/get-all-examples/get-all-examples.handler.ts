import 'reflect-metadata'

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllExamplesQuery } from './get-all-examples.query'
import { Inject } from '@nestjs/common'
import { ExampleRepository } from '@microservice/schemify-microservice/example/domain/repositories/example.repository'

import { Logger } from '@nestjs/common'

@QueryHandler(GetAllExamplesQuery)
export class GetAllExamplesHandler
  implements IQueryHandler<GetAllExamplesQuery>
{
  private readonly logger = new Logger(GetAllExamplesHandler.name)
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {
    this.logger.log('Handler cargado correctamente')
  }

  async execute(): Promise<any> {
    const all = await this.repository.findAll()
    return all.map((e) => e.toPrimitives())
  }
}
