export interface CursorResult<T> {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
}
