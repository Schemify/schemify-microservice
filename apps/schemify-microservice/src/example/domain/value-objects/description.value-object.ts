export class DescriptionValueObject {
  static readonly MAX_LENGTH = 300

  private constructor(public readonly value: string) {}

  static create(value?: string): DescriptionValueObject {
    const normalized = (value ?? '').trim()

    if (normalized.length > this.MAX_LENGTH) {
      throw new Error(`Description exceeds max length of ${this.MAX_LENGTH}`)
    }

    return new DescriptionValueObject(normalized)
  }
}
