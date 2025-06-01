import { join } from 'path'

const PROTO_ROOT = join(process.cwd(), 'dist', 'libs', 'proto', 'src')

export const PROTO_PATHS = {
  example: join(PROTO_ROOT, 'example', 'example.proto'),
  prueba: join(PROTO_ROOT, 'prueba', 'prueba.proto')
}
