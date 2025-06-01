/**
 * UpdateExampleHandler
 * -----------------------------------------------------------------------------
 * Handler que responde al comando `UpdateExampleCommand`.
 *
 * Se encarga de:
 * - Verificar que el `ExampleEntity` existe en el sistema
 * - Aplicar actualizaciones parciales mediante métodos del dominio
 * - Guardar los cambios usando el repositorio de escritura
 * - Emitir eventos si corresponde (`rename`, `updateDescription`)
 *
 * Esta clase forma parte de la **capa de aplicación**, implementando el patrón **CQRS**.
 *
 * Flujo de ejecución:
 * 1. Se envía un `UpdateExampleCommand` con uno o más campos a actualizar
 * 2. El `CommandBus` ejecuta este handler
 * 3. El handler busca la entidad por ID
 * 4. Si no existe, lanza `NotFoundException`
 * 5. Si existe, llama a los métodos mutadores del dominio
 * 6. Guarda los cambios en el repositorio
 * 7. Ejecuta `entity.commit()` para publicar los eventos
 *
 * Dependencias:
 * - `GetExampleByIdPort`: para verificar existencia (solo lectura)
 * - `UpdateExamplePort`: para persistir el resultado modificado
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { UpdateExampleCommand } from './update-example.command'

import { ExampleEntity } from '@example//example/domain/entities/example.entity'

import { GetExampleByIdPort } from '@example//example/application/ports/outbounds/repositories/example-query-ports'
import { UpdateExamplePort } from '@example//example/application/ports/outbounds/repositories/example-command-ports'
@CommandHandler(UpdateExampleCommand)
export class UpdateExampleHandler
  implements ICommandHandler<UpdateExampleCommand>
{
  constructor(
    @Inject(GetExampleByIdPort)
    private readonly getExampleByIdPort: GetExampleByIdPort,
    @Inject(UpdateExamplePort)
    private readonly updateExamplePort: UpdateExamplePort
  ) {}

  /**
   * Ejecuta el comando de actualización.
   *
   * @param command Datos de entrada para actualizar el Example
   * @returns La entidad actualizada
   * @throws NotFoundException si el recurso no existe
   */
  async execute(command: UpdateExampleCommand): Promise<ExampleEntity> {
    const example = await this.getExampleByIdPort.getById(command.id)

    if (!example) {
      throw new NotFoundException(`Example with id ${command.id} not found`)
    }

    // ✅ Usamos el método de actualización centralizado en el agregado
    example.update({
      name: command.name,
      description: command.description
    })

    await this.updateExamplePort.update(example)
    example.commit()

    return example
  }
}
