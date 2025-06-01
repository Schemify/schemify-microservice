/**
 * CreateExampleHandler
 * -----------------------------------------------------------------------------
 * Handler que responde al comando `CreateExampleCommand`.
 *
 * Se encarga de:
 * - Instanciar un nuevo `ExampleEntity` desde los datos del comando
 * - Validar automáticamente usando los ValueObjects del dominio
 * - Persistir el nuevo agregado mediante el repositorio de escritura
 * - Aplicar el evento `ExampleCreatedEvent`
 *
 * Esta clase forma parte de la **capa de aplicación**, implementando el patrón **CQRS**.
 *
 * Flujo de ejecución:
 * 1. El cliente o servicio envía `CreateExampleCommand` al `CommandBus`
 * 2. NestJS ejecuta este handler
 * 3. Se crea un nuevo `ExampleEntity` con sus reglas de dominio
 * 4. El handler invoca `createExamplePort.create(...)`
 * 5. Se aplica el evento de creación (`entity.commit()`)
 * 6. Se retorna la entidad (puede ser transformada antes de exponerse)
 *
 * Dependencias:
 * - `CreateExamplePort`: capa de persistencia orientada a escritura
 */

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { CreateExampleCommand } from './create-example.command'

import { ExampleEntity } from '@example//example/domain/entities/example.entity'

import { CreateExamplePort } from '@example//example/application/ports/outbounds/repositories/example-command-ports'

import { Inject } from '@nestjs/common'

@CommandHandler(CreateExampleCommand)
export class CreateExampleHandler
  implements ICommandHandler<CreateExampleCommand>
{
  constructor(
    @Inject(CreateExamplePort)
    private readonly createExamplePort: CreateExamplePort,
    private readonly publisher: EventPublisher
  ) {}

  /**
   * Ejecuta el comando creando un nuevo agregado en el dominio.
   *
   * @param command Datos del nuevo ejemplo
   * @returns Instancia del agregado `ExampleEntity` creado
   */
  async execute(command: CreateExampleCommand): Promise<ExampleEntity> {
    const entity = ExampleEntity.create({
      name: command.name,
      description: command.description
    })

    const merged = this.publisher.mergeObjectContext(entity)
    await this.createExamplePort.create(merged)
    merged.commit()

    return entity
  }
}
