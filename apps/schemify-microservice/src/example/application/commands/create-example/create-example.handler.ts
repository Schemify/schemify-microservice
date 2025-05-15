import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateExampleCommand } from './create-example.command'
import { Inject } from '@nestjs/common'
import { ExampleRepository } from '@microservice/schemify-microservice/example/domain/repositories/example.repository'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

@CommandHandler(CreateExampleCommand)
export class CreateExampleHandler
  implements ICommandHandler<CreateExampleCommand>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(command: CreateExampleCommand): Promise<ExampleEntity> {
    const entity = ExampleEntity.create({
      name: command.name,
      description: command.description
    })

    await this.repository.create(entity)
    entity.commit()
    return entity
  }
}
