/**
 * CreateExampleCommand
 * -----------------------------------------------------------------------------
 * Comando que solicita la creación de un nuevo agregado `ExampleEntity`.
 *
 * Es procesado por el `CreateExampleHandler`, que orquesta la lógica de creación,
 * validación y persistencia del nuevo registro.
 *
 * Los datos enviados serán transformados en ValueObjects dentro del dominio.
 */

import { ICommand } from '@nestjs/cqrs'

export class CreateExampleCommand implements ICommand {
  constructor(
    /**
     * Nombre del nuevo Example (obligatorio)
     */
    public readonly name: string,

    /**
     * Descripción opcional del Example
     */
    public readonly description?: string
  ) {}
}
