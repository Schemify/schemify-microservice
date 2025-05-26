/**
 * UpdateExampleCommand
 * -----------------------------------------------------------------------------
 * Comando que solicita la actualización de uno o más campos del `ExampleEntity`.
 *
 * Este comando es procesado por el `UpdateExampleHandler`, quien valida la existencia
 * del recurso y aplica los cambios permitidos usando los métodos del dominio.
 *
 * Se permite actualizar uno o ambos campos (`name` y `description`).
 */

import { ICommand } from '@nestjs/cqrs'

export class UpdateExampleCommand implements ICommand {
  constructor(
    /**
     * ID del Example a modificar
     */
    public readonly id: string,

    /**
     * Nuevo nombre (opcional)
     */
    public readonly name?: string,

    /**
     * Nueva descripción (opcional)
     */
    public readonly description?: string
  ) {}
}
