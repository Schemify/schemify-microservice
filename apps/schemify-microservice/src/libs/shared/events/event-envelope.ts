export interface Envelope<T = unknown> {
  type: string // "ExampleCreated"
  version: number // 1
  payload: T // datos de negocio
}
