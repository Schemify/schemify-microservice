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

  private constructor(private readonly _value: string) {}

  /**
   * Accede al valor plano del nombre.
   */
  get value(): string {
    return this._value
  }

  /**
   * Crea una nueva instancia asegurando las reglas del dominio.
   * @throws Error si el nombre es inválido
   */
  static create(name?: string): NameValueObject {
    const trimmed = name?.trim()

    // 🟡 Regla 1: El nombre debe existir
    if (!trimmed) {
      throw new Error('Name is required')
    }

    // 🟡 Regla 2: El nombre debe tener al menos MIN_LENGTH caracteres
    if (trimmed.length < this.MIN_LENGTH) {
      throw new Error(`Name must be at least ${this.MIN_LENGTH} characters`)
    }

    // 🟡 Regla 3: El nombre no debe superar MAX_LENGTH caracteres
    if (trimmed.length > this.MAX_LENGTH) {
      throw new Error(`Name must be at most ${this.MAX_LENGTH} characters`)
    }

    return new NameValueObject(trimmed)
  }

  /**
   * Compara el valor con otro VO del mismo tipo.
   */
  equals(other: NameValueObject): boolean {
    return this._value === other._value
  }
}
