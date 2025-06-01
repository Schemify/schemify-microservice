/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/**
 * DeleteExampleGrpcController
 * -----------------------------------------------------------------------------
 * Controlador gRPC que maneja la operación `deleteExample()` del servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Recibir el ID del recurso a eliminar desde el DTO Protobuf
 * ✅ Enviar el comando `DeleteExampleCommand` mediante el `CommandBus`
 * ✅ Retornar una respuesta vacía (`ExampleEmpty`) al cliente gRPC
 *
 * Esta clase forma parte de la capa **de infraestructura** y solo actúa como puente
 * entre el transporte (gRPC) y la capa de aplicación.
 */

import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { example } from '@proto'

import { DeleteExampleCommand } from '@example//example/application/ports/inbounds/commands'
import { GrpcMethod } from '@nestjs/microservices'

@Controller()
export class DeleteExampleGrpcController {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * ⚠️ NOTA IMPORTANTE:
   * Esta clase NO implementa la interfaz completa `ExampleServiceController`
   * ya que sólo implementa el RPC `deleteExample`.
   * NestJS vincula el método mediante reflexión con
   * `@ExampleServiceControllerMethods()`.
   */

  /**
   * Maneja la llamada RPC `deleteExample`.
   *
   * Flujo:
   * 1. Recibe un DTO con el ID del recurso
   * 2. Ejecuta `DeleteExampleCommand` por medio del `CommandBus`
   * 3. No devuelve entidad ni DTO; sólo `{}` como `ExampleEmpty`
   *
   * @param request DTO gRPC con el ID del recurso
   * @returns Objeto vacío `ExampleEmpty`
   */

  @GrpcMethod(example.EXAMPLE_SERVICE_NAME, 'deleteExample')
  async deleteExample(
    request: example.GetExampleByIdDto
  ): Promise<example.ExampleEmpty> {
    const command = new DeleteExampleCommand(request.id)
    await this.commandBus.execute(command)

    return {}
  }
}
