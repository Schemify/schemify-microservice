/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/**
 * GetExamplesByCursorGrpcController
 * -----------------------------------------------------------------------------
 * Controlador gRPC que maneja la operación `getExamplesByCursor()` del servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Ejecutar el caso de uso `GetExamplesByCursorQuery` usando `QueryBus`
 * ✅ Transformar los resultados del dominio a formato Protobuf
 * ✅ Devolver paginación cursor-based compatible con el contrato `.proto`
 *
 * ✔️ Alineado a CQRS
 * ✔️ Responsable de un solo caso de uso
 * ✔️ No contiene lógica de negocio
 */

import { Controller } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { example } from '@app/proto'

import { CursorResult } from '@microservice/schemify-microservice/libs/shared/interfaces/pagination/cursor-result.interface'

import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

import { GetExamplesByCursorQuery } from '@microservice/schemify-microservice/example/application/ports/inbounds/queries'
import { ExampleMapper } from '@microservice/schemify-microservice/libs/shared/mappers/example.mapper'
import { GrpcMethod } from '@nestjs/microservices'

@Controller('ExampleService')
export class GetExamplesByCursorGrpcController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * ⚠️ NOTA IMPORTANTE:
   * Esta clase NO implementa la interfaz completa `ExampleServiceController`
   * ya que sólo expone un RPC (`getExamplesByCursor`).
   * NestJS enlaza este método mediante reflexión con el decorador
   * `@ExampleServiceControllerMethods()`.
   */

  /**
   * Maneja el RPC `getExamplesByCursor`.
   *
   * Flujo:
   * 1. Recibe `afterId` y `limit` desde el request gRPC
   * 2. Ejecuta el query `GetExamplesByCursorQuery` con esos parámetros
   * 3. El handler devuelve:
   *    - items (ExampleEntity[])
   *    - nextCursor (string | null)
   *    - hasMore (boolean)
   * 4. Se transforma la salida al contrato `.proto`
   *
   * @param request objeto `CursorPaginationRequest` generado desde `.proto`
   * @returns CursorPaginatedExamples (protobuf)
   */

  @GrpcMethod(example.EXAMPLE_SERVICE_NAME, 'getExamplesByCursor')
  async getExamplesByCursor(
    request: example.CursorPaginationRequest
  ): Promise<example.CursorPaginatedExamples> {
    const query = new GetExamplesByCursorQuery({
      afterId: request.afterId,
      limit: request.limit
    })

    const { items, nextCursor, hasMore } = await this.queryBus.execute<
      GetExamplesByCursorQuery,
      CursorResult<ExampleEntity>
    >(query)

    return {
      examples: items.map((e) => this.mapper.entityToProto(e)),
      nextCursor: nextCursor ?? '',
      hasMore
    }
  }
}
