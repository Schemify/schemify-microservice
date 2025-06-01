/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

/**
 * GetAllExamplesGrpcController
 * -----------------------------------------------------------------------------
 * Este controlador maneja la llamada gRPC `getAllExamples` definida en el servicio `ExampleService`.
 *
 * Se encarga de:
 * ✅ Ejecutar el caso de uso `GetAllExamplesQuery` usando el `QueryBus` de NestJS
 * ✅ Transformar el resultado (entidades de dominio) en formato Protobuf (DTO)
 * ✅ Devolverlo como respuesta al cliente gRPC
 *
 * Forma parte de la capa de **infraestructura**, implementando el endpoint del contrato gRPC,
 * pero delegando toda la lógica de negocio a la capa de aplicación.
 *
 * NOTA:
 * - Este controlador NO contiene lógica de negocio
 * - NO accede a la base de datos directamente
 * - Solo orquesta: recibe, delega, transforma y responde
 */

import { Controller } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import { example } from '@proto'

import { GetAllExamplesQuery } from '@example//example/application/ports/inbounds/queries'
import { ExampleEntity } from '@example//example/domain/entities/example.entity'
import { ExampleMapper } from '@example//libs/shared/mappers/example.mapper'
import { GrpcMethod } from '@nestjs/microservices'

@Controller()
export class GetAllExamplesGrpcController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * Implementación de la operación `getAllExamples()` definida en el archivo .proto
   *
   * Flujo:
   *  1. Se ejecuta la query `GetAllExamplesQuery` a través del `QueryBus`
   *  2. El `QueryHandler` correspondiente devuelve una lista de `ExampleEntity`
   *  3. Se mapean a objetos `example.Example` (Protobuf)
   *  4. Se devuelve el objeto `example.Examples` (con una lista de resultados)
   *
   * @returns Protobuf `example.Examples` con la lista de ejemplos
   */
  @GrpcMethod('ExampleService', 'getAllExamples')
  async getAllExamples(): Promise<example.Examples> {
    const entities = await this.queryBus.execute<
      GetAllExamplesQuery,
      ExampleEntity[]
    >(new GetAllExamplesQuery())

    return {
      examples: entities.map((entity) => this.mapper.entityToProto(entity))
    }
  }
}
