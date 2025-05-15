export * from './get-all-examples/get-all-examples.handler'
export * from './get-all-examples/get-all-examples.query'
export * from './get-example-by-id/get-example-by-id.handler'
export * from './get-example-by-id/get-example-by-id.query'
export * from './get-examples-by-cursor/get-examples-by-cursor.handler'
export * from './get-examples-by-cursor/get-examples-by-cursor.query'

import { GetAllExamplesHandler } from './get-all-examples/get-all-examples.handler'
import { GetExampleByIdHandler } from './get-example-by-id/get-example-by-id.handler'
import { GetExamplesByCursorHandler } from './get-examples-by-cursor/get-examples-by-cursor.handler'

export const QueryHandlers = [
  GetAllExamplesHandler,
  GetExampleByIdHandler,
  GetExamplesByCursorHandler
]
