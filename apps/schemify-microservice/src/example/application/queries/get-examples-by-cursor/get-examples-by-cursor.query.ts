export class GetExamplesByCursorQuery {
  constructor(public readonly payload: { afterId: string; limit: number }) {}
}
