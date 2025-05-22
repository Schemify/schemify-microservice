/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/**
 * CreateExampleGrpcController
 * -----------------------------------------------------------------------------
 * Controlador gRPC que maneja la operación `createExample()` del servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Convertir el DTO entrante desde gRPC a value objects de dominio
 * ✅ Ejecutar el caso de uso `CreateExampleCommand` a través del `CommandBus`
 * ✅ Transformar la entidad resultante en un objeto Protobuf para devolver al cliente
 *
 * 💡 Este controlador forma parte de la capa de **infraestructura**.
 * - No implementa lógica de negocio
 * - No accede a la base de datos directamente
 */

import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { example } from '@app/proto'

import { CreateExampleCommand } from '@microservice/schemify-microservice/example/application/commands'

import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

@Controller()
@example.ExampleServiceControllerMethods()
export class CreateExampleGrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * ⚠️ NOTA IMPORTANTE:
   * Esta clase NO implementa la interfaz completa `ExampleServiceController`
   * ya que sólo expone un RPC (`createExample`).
   * NestJS enlaza este método mediante reflexión usando
   * `@ExampleServiceControllerMethods()`.
   *
   * 👉 No uses `implements ExampleServiceController`
   */

  /**
   * Maneja el RPC `createExample`.
   *
   * Flujo:
   * 1. Recibe un DTO desde gRPC (`CreateExampleDto`)
   * 2. Convierte los datos usando `ExampleMapper.protoToProps()`
   * 3. Ejecuta el comando `CreateExampleCommand` con esos datos
   * 4. El handler devuelve una entidad creada
   * 5. Se transforma en Protobuf y se responde
   *
   * @param request DTO gRPC generado desde `.proto`
   * @returns `example.Example` (respuesta serializada)
   */
  async createExample(
    request: example.CreateExampleDto
  ): Promise<example.Example> {
    const props = this.mapper.protoToProps(request)

    const command = new CreateExampleCommand(
      props.name.value,
      props.description?.value
    )

    const entity = await this.commandBus.execute(command)

    return this.mapper.entityToProto(entity)
  }
}
