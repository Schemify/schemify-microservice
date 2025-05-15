import { GetAllExamplesHandler } from './get-all-examples/get-all-examples.handler'
import { GetExampleByIdHandler } from './get-example-by-id/get-example-by-id.handler'
import { GetExamplesByCursorHandler } from './get-examples-by-cursor/get-examples-by-cursor.handler'

export const QueryHandlers = [
  GetAllExamplesHandler,
  GetExampleByIdHandler,
  GetExamplesByCursorHandler
]
