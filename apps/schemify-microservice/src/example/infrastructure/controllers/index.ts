/**
 * 📦 Controladores del Microservicio `Example`
 * -----------------------------------------------------------------------------
 * Punto de entrada unificado para todos los controladores disponibles en este microservicio.
 *
 * Agrupa:
 * - 🟦 Controladores gRPC (lectura y escritura) → `ExampleGrpcControllers`
 * - 🟨 Controladores HTTP (si existen o en el futuro) → `ExampleHttpControllers`
 *
 * 📌 Este archivo debe ser usado en el `ExampleModule` como:
 *
 * ```ts
 * import { Controllers } from './infrastructure/controllers'
 *
 * @Module({
 *   controllers: [...Controllers]
 * })
 * export class ExampleModule {}
 * ```
 *
 * 🔄 Se adapta a nuevos transportes agregando nuevos arrays.
 */

// ✅ Importa todos los controladores gRPC (read + write)
import { GrpcControllers } from './grpc'

// 🟨 Controladores HTTP (modular, aunque esté vacío por ahora)
// import { HttpControllers } from './http'

/**
 * ✅ Conjunto completo de controladores del microservicio
 * (transportes: gRPC, HTTP, etc.)
 */
export const Controllers = [
  ...GrpcControllers
  // ...HttpControllers
]

// 🔁 Reexportaciones opcionales
export * from './grpc'
// export * from './http'
