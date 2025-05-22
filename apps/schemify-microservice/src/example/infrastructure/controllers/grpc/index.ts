/**
 * 📦 gRPC Controllers - CQRS (Read + Write)
 * -----------------------------------------------------------------------------
 * Punto de entrada centralizado para todos los controladores gRPC del microservicio `Example`.
 *
 * Agrupa:
 * - 🔹 Controladores de lectura (queries) → `ExampleGrpcReadControllers`
 * - 🔹 Controladores de escritura (commands) → `ExampleGrpcWriteControllers`
 *
 * Este archivo permite importar todos los controladores gRPC del microservicio
 * desde un único lugar, facilitando su registro en el `ExampleModule`.
 *
 * ✔️ Compatible con `@ExampleServiceControllerMethods()`
 * ❌ NO se implementan interfaces completas gRPC (solo métodos específicos)
 *
 * 📌 Ejemplo de uso en el módulo principal:
 *
 * ```ts
 * import { ExampleGrpcControllers } from './infrastructure/controllers/grpc'
 *
 * @Module({
 *   controllers: [...ExampleGrpcControllers]
 * })
 * export class ExampleModule {}
 * ```
 */

// 📥 Controladores de lectura (queries)
import { ExampleGrpcReadControllers } from './read'

// 📤 Controladores de escritura (commands)
import { ExampleGrpcWriteControllers } from './write'

/**
 * ✅ Controladores gRPC combinados (lectura + escritura)
 */
export const GrpcControllers = [
  ...ExampleGrpcReadControllers,
  ...ExampleGrpcWriteControllers
]

// 🔁 Reexportaciones por separado (si se necesita granularidad)
export * from './read'
export * from './write'
