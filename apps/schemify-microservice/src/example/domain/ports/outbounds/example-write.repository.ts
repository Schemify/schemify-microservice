/**
 * ExampleWriteRepository
 * -----------------------------------------------------------------------------
 * Interfaz que define el contrato de persistencia **de escritura** para `ExampleEntity`.
 * Es parte del patrón de arquitectura **Hexagonal (puerto de salida)**.
 *
 * Esta interfaz se usa dentro de:
 *  - Command Handlers
 *  - Application Services
 *
 * Su implementación es responsable de:
 *  - Insertar nuevos agregados (`create`)
 *  - Persistir cambios (`update`)
 *  - Eliminar registros (`delete`)
 *
 * 🔹 Se implementa en la capa de infraestructura, típicamente con un ORM.
 * 🔹 El dominio y los handlers solo dependen de esta interfaz.
 */

import { ExampleEntity } from '../../entities/example.entity'

export abstract class ExampleWriteRepository {
  /**
   * Persiste un nuevo agregado en la base de datos.
   * @param entity Agregado a crear
   */
  abstract create(entity: ExampleEntity): Promise<void>

  /**
   * Actualiza los datos del agregado persistido.
   * @param entity Agregado modificado
   */
  abstract update(entity: ExampleEntity): Promise<void>

  /**
   * Elimina el agregado por ID (soft-delete o hard-delete, según implementación).
   * @param id ID del agregado a eliminar
   */
  abstract delete(id: string): Promise<void>
}
