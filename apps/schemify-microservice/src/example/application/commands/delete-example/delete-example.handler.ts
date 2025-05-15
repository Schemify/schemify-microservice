import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteExampleCommand } from './delete-example.command'
import { Inject, NotFoundException } from '@nestjs/common'
import { ExampleRepository } from '../../../domain/repositories/example.repository'

@CommandHandler(DeleteExampleCommand)
export class DeleteExampleHandler
  implements ICommandHandler<DeleteExampleCommand>
{
  constructor(
    @Inject('ExampleRepository') private readonly repository: ExampleRepository
  ) {}

  async execute(command: DeleteExampleCommand): Promise<void> {
    const entity = await this.repository.findById(command.id)

    if (!entity) {
      throw new NotFoundException(`Example with id ${command.id} not found`)
    }

    await this.repository.delete(command.id)
  }
}
