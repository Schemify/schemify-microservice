import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateExampleCommand } from './create-example.command'
import { Inject } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'
import { ExampleEntity } from '../../../domain/entities/example.entity'

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

    await this.repository.save(entity)
    entity.commit()
    return entity
  }
}
