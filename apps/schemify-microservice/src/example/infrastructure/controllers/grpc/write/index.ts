/**
 * 📌 gRPC Write Controllers - CQRS (Commands)
 * -----------------------------------------------------------------------------
 * Este archivo agrupa todos los controladores gRPC responsables de operaciones
 * de escritura (`Commands`) para el agregado `Example`.
 *
 * Cada controlador implementa un único RPC del servicio definido en el `.proto`,
 * correspondiente a una acción de mutación (create, update, delete).
 *
 * ❗ Importante:
 * - Estos controladores NO implementan directamente `ExampleServiceController`
 * - NestJS los vincula mediante reflexión con el decorador
 *   `@ExampleServiceControllerMethods()`
 * - Se usan en el `ExampleModule` para ser registrados como `controllers`
 *
 * 📦 Exportación centralizada para facilitar su inclusión:
 *
 * ```ts
 * import { ExampleGrpcWriteControllers } from './controllers/grpc/write'
 *
 * @Module({
 *   controllers: [...ExampleGrpcWriteControllers]
 * })
 * export class ExampleModule {}
 * ```
 */

// 🧩 Controladores individuales (por comando)
import { CreateExampleGrpcController } from './create-example/create-example.grpc.controller'
import { UpdateExampleGrpcController } from './update-example/update-example.grpc.controller'
import { DeleteExampleGrpcController } from './delete-example/delete-example.grpc.controller'

/**
 * 📦 Conjunto de controladores gRPC de escritura para CQRS Commands
 */
export const ExampleGrpcWriteControllers = [
  CreateExampleGrpcController,
  UpdateExampleGrpcController,
  DeleteExampleGrpcController
]

// 📤 Exportación individual si se necesita
export * from './create-example/create-example.grpc.controller'
export * from './update-example/update-example.grpc.controller'
export * from './delete-example/delete-example.grpc.controller'
