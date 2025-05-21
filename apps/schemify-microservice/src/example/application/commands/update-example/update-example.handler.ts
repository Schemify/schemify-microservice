import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateExampleCommand } from './update-example.command'
import { Inject, NotFoundException } from '@nestjs/common'
import { ExampleWriteRepository } from '@microservice/schemify-microservice/example/domain/repositories/ExampleWriteRepository'
import { ExampleEntity } from '../../../domain/entities/example.entity'

@CommandHandler(UpdateExampleCommand)
export class UpdateExampleHandler
  implements ICommandHandler<UpdateExampleCommand>
{
  constructor(
    @Inject('ExampleWriteRepository')
    private readonly repository: ExampleWriteRepository
  ) {}

  async execute(command: UpdateExampleCommand): Promise<ExampleEntity> {
    const example = await this.repository.findById(command.id)

    if (!example) {
      throw new NotFoundException(`Example with id ${command.id} not found`)
    }

    // ✅ Usamos lógica rica de entidad
    if (command.name) {
      example.rename(command.name)
    }

    if (command.description) {
      example.updateDescription(command.description)
    }

    await this.repository.update(example)
    example.commit()

    return example
  }
}
