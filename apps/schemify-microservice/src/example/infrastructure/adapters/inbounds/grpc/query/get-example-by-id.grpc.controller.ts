/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/**
 * GetExampleByIdGrpcController
 * -----------------------------------------------------------------------------
 * Controlador gRPC para manejar la operación `getExampleById()` del servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Ejecutar el caso de uso `GetExampleByIdQuery` usando el `QueryBus`
 * ✅ Convertir la entidad `ExampleEntity` en una respuesta Protobuf (example.Example)
 * ✅ Devolver la respuesta al cliente gRPC
 *
 * 🔒 No accede directamente a la base de datos.
 * 🔁 No contiene lógica de negocio (sólo delega y transforma).
 */

import { Controller } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { example } from '@proto'

import { GetExampleByIdQuery } from '@example/example/application/ports/inbounds/queries'
import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'
import { GrpcMethod } from '@nestjs/microservices'

@Controller('ExampleService')
export class GetExampleByIdGrpcController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * ⚠️ NOTA IMPORTANTE:
   * Esta clase NO implementa la interfaz completa `ExampleServiceController`
   * ya que sólo expone un RPC (`getExampleById`).
   * NestJS vincula este método gracias al decorador
   * `@ExampleServiceControllerMethods()` usando reflexión.
   *
   * 👉 No usar `implements ExampleServiceController` para evitar errores TS2420
   */

  /**
   * Maneja la llamada RPC `getExampleById`.
   *
   * Flujo:
   *  1. Recibe un DTO con el `id` del ejemplo a buscar
   *  2. Ejecuta el caso de uso `GetExampleByIdQuery` a través del `QueryBus`
   *  3. El handler devuelve una entidad del dominio `ExampleEntity`
   *  4. Se transforma en un objeto Protobuf (`example.Example`)
   *  5. Se retorna al cliente gRPC
   *
   * @param request DTO generado desde el contrato gRPC (`.proto`)
   * @returns example.Example (objeto compatible con el contrato Protobuf)
   */

  @GrpcMethod(example.EXAMPLE_SERVICE_NAME, 'getExampleById')
  async getExampleById(
    request: example.GetExampleByIdDto
  ): Promise<example.Example> {
    const query = new GetExampleByIdQuery({ id: request.id })

    const entity = await this.queryBus.execute(query)

    return this.mapper.entityToProto(entity)
  }
}
