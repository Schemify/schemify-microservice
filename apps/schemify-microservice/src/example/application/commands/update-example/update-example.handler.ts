import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateExampleCommand } from './update-example.command'
import { Inject, NotFoundException } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'

import { ExampleEntity } from '../../../domain/entities/example.entity'

@CommandHandler(UpdateExampleCommand)
export class UpdateExampleHandler
  implements ICommandHandler<UpdateExampleCommand>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(command: UpdateExampleCommand) {
    const old = await this.repository.findById(command.id)

    if (!old) {
      throw new NotFoundException(`Example with id ${command.id} not found`)
    }

    const updated = ExampleEntity.fromPrimitives({
      id: old.id,
      name: command.name ?? old.toPrimitives().name,
      description: command.description ?? old.toPrimitives().description,
      createdAt: old.toPrimitives().createdAt,
      updatedAt: new Date()
    })

    await this.repository.save(updated)
    updated.commit()
    return updated
  }
}
