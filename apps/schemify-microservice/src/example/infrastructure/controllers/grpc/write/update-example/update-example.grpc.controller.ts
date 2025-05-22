/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/**
 * UpdateExampleGrpcController
 * -----------------------------------------------------------------------------
 * Controlador gRPC que maneja la operación `updateExample()` del servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Recibir el `id` y nuevos valores de actualización desde el DTO Protobuf
 * ✅ Ejecutar el caso de uso `UpdateExampleCommand` mediante el `CommandBus`
 * ✅ Convertir la entidad resultante en un objeto `example.Example` (Protobuf)
 *
 * Esta clase forma parte de la **capa de infraestructura**, y su función es
 * traducir el transporte en ejecución de lógica de aplicación.
 */

import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { example } from '@app/proto'

import { UpdateExampleCommand } from '@microservice/schemify-microservice/example/application/commands/'
import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

@Controller()
@example.ExampleServiceControllerMethods()
export class UpdateExampleGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * ⚠️ NOTA IMPORTANTE:
   * Esta clase NO implementa la interfaz completa `ExampleServiceController`
   * ya que sólo implementa el RPC `updateExample`.
   * NestJS vincula el método usando reflexión con
   * `@ExampleServiceControllerMethods()`.
   */

  /**
   * Maneja la llamada RPC `updateExample`.
   *
   * Flujo:
   * 1. Recibe un DTO con el `id` y campos a actualizar
   * 2. Convierte los datos a objetos de valor mediante `ExampleMapper`
   * 3. Ejecuta el comando `UpdateExampleCommand`
   * 4. El handler aplica cambios y retorna la entidad modificada
   * 5. Se transforma a Protobuf y se retorna al cliente gRPC
   *
   * @param request DTO gRPC con los datos actualizables (`UpdateExampleDto`)
   * @returns `example.Example` (respuesta actualizada)
   */
  async updateExample(
    request: example.UpdateExampleDto
  ): Promise<example.Example> {
    const props = this.mapper.protoToProps(request.example!)

    const command = new UpdateExampleCommand(
      request.id,
      props.name?.value,
      props.description?.value
    )

    const entity = await this.commandBus.execute(command)

    return this.mapper.entityToProto(entity)
  }
}
