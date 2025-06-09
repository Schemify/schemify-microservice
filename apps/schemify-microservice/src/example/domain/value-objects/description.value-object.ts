/**
 * DescriptionValueObject
 * -----------------------------------------------------------------------------
 * Value Object que representa la descripción de un Example.
 *
 * Reglas del dominio:
 *  - Es opcional (puede no existir)
 *  - Si existe, debe tener como máximo 300 caracteres
 *
 * Propósito:
 * Permitir una descripción limpia y válida, sin exceder el límite funcional.
 */

export class DescriptionValueObject {
  public static readonly MAX_LENGTH = 300

  /**
   * Valor plano de la descripción.
   */
  public readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  /**
   * Crea una nueva instancia asegurando las reglas del dominio.
   * @throws Error si la descripción es demasiado larga
   */
  static create(value?: string): DescriptionValueObject {
    const normalized = (value ?? '').trim()

    if (normalized.length > this.MAX_LENGTH) {
      throw new Error(`Description exceeds max length of ${this.MAX_LENGTH}`)
    }

    return new DescriptionValueObject(normalized)
  }

  /**
   * Compara el valor con otro VO del mismo tipo.
   */
  equals(other: DescriptionValueObject): boolean {
    return this.value === other.value
  }
}
