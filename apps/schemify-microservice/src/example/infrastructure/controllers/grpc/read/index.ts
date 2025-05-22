/**
 * 📌 gRPC Read Controllers - CQRS (Queries)
 * -----------------------------------------------------------------------------
 * Este archivo agrupa todos los controladores gRPC responsables de operaciones
 * de lectura (`Query`) para el agregado `Example`.
 *
 * Cada controlador maneja un único endpoint gRPC del servicio definido en el `.proto`.
 * Se usa en el `ExampleModule` para registrar los controladores de lectura gRPC.
 *
 * ❗ Importante:
 * - No se debe usar `implements ExampleServiceController` ya que estos controladores
 *   sólo implementan parcialmente los métodos gRPC.
 * - NestJS los enlaza mediante el decorador `@ExampleServiceControllerMethods()`.
 *
 * Uso típico:
 *
 * ```ts
 * import { ExampleGrpcReadControllers } from './controllers/grpc/read'
 *
 * @Module({
 *   controllers: [...ExampleGrpcReadControllers]
 * })
 * export class ExampleModule {}
 * ```
 */

// 🧩 Controladores individuales (por caso de uso)
import { GetAllExamplesGrpcController } from './get-all-examples/get-all-examples.grpc.controller'
import { GetExampleByIdGrpcController } from './get-example-by-id/get-example-by-id.grpc.controller'
import { GetExamplesByCursorGrpcController } from './get-examples-by-cursor/get-examples-by-cursor.grpc.controller'

/**
 * 📦 Array de controladores gRPC para Queries (Lectura)
 */
export const ExampleGrpcReadControllers = [
  GetAllExamplesGrpcController,
  GetExampleByIdGrpcController,
  GetExamplesByCursorGrpcController
]

// 📤 Exportación individual si se necesita
export * from './get-all-examples/get-all-examples.grpc.controller'
export * from './get-example-by-id/get-example-by-id.grpc.controller'
export * from './get-examples-by-cursor/get-examples-by-cursor.grpc.controller'
