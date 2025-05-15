//
export class CreateExampleCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string
  ) {}
}
