/**
 * DeleteExampleHandler
 * -----------------------------------------------------------------------------
 * Handler que responde al comando `DeleteExampleCommand`.
 *
 * Se encarga de:
 * - Verificar si el `ExampleEntity` existe en el sistema
 * - Delegar su eliminación al repositorio de escritura
 *
 * Esta clase forma parte de la **capa de aplicación**, implementando el patrón **CQRS**.
 *
 * Flujo de ejecución:
 * 1. Se envía un `DeleteExampleCommand` con el ID del recurso
 * 2. El `CommandBus` ejecuta este handler
 * 3. El handler consulta si el recurso existe
 * 4. Si no existe, lanza `NotFoundException`
 * 5. Si existe, ejecuta `writeRepository.delete(id)`
 *
 * Dependencias:
 * - `ExampleWriteRepository`: contrato de persistencia de escritura
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { DeleteExampleCommand } from './delete-example.command'

import { ExampleWriteRepository } from '@microservice/schemify-microservice/example/domain/repositories/ExampleWriteRepository'
import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/ExampleReadRepository'

@CommandHandler(DeleteExampleCommand)
export class DeleteExampleHandler
  implements ICommandHandler<DeleteExampleCommand>
{
  constructor(
    @Inject('ExampleWriteRepository')
    private readonly writeRepository: ExampleWriteRepository,
    @Inject('ExampleReadRepository')
    private readonly readRepository: ExampleReadRepository
  ) {}

  /**
   * Ejecuta el comando de eliminación.
   *
   * @param command Comando con el ID del agregado a eliminar
   * @throws NotFoundException si el recurso no existe
   */
  async execute(command: DeleteExampleCommand): Promise<void> {
    const entity = await this.readRepository.findById(command.id)

    if (!entity) {
      throw new NotFoundException(`Example with id ${command.id} not found`)
    }

    await this.writeRepository.delete(command.id)
  }
}
