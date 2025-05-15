import { CreateExampleHandler } from './create-example/create-example.handler'
import { UpdateExampleHandler } from './update-example/update-example.handler'
import { DeleteExampleHandler } from './delete-example/delete-example.handler'

export const CommandHandlers = [
  CreateExampleHandler,
  UpdateExampleHandler,
  DeleteExampleHandler
]
