/**
 * NameValueObject
 * -----------------------------------------------------------------------------
 * Value Object que representa el nombre de un Example.
 *
 * Reglas del dominio:
 *  - Debe estar presente (obligatorio)
 *  - Mínimo de 3 caracteres
 *  - Máximo de 50 caracteres
 *
 * Propósito:
 * Asegurar que cualquier nombre que se use en el dominio sea válido y consistente.
 */

export class NameValueObject {
  public static readonly MIN_LENGTH = 3
  public static readonly MAX_LENGTH = 50

  /**
   * Valor plano del VO, accesible directamente.
   */
  public readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  /**
   * Crea una nueva instancia asegurando las reglas del dominio.
   * @throws Error si el nombre es inválido
   */
  static create(name?: string): NameValueObject {
    const trimmed = name?.trim()

    if (!trimmed) {
      throw new Error('Name is required')
    }

    if (trimmed.length < this.MIN_LENGTH) {
      throw new Error(`Name must be at least ${this.MIN_LENGTH} characters`)
    }

    if (trimmed.length > this.MAX_LENGTH) {
      throw new Error(`Name must be at most ${this.MAX_LENGTH} characters`)
    }

    return new NameValueObject(trimmed)
  }

  /**
   * Compara el valor con otro VO del mismo tipo.
   */
  equals(other: NameValueObject): boolean {
    return this.value === other.value
  }
}
