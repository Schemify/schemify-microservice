export class NameValueObject {
  public static readonly MIN_LENGTH = 3
  public static readonly MAX_LENGTH = 50

  private constructor(public readonly value: string) {}

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

  equals(other: NameValueObject): boolean {
    return this.value === other.value
  }
}
