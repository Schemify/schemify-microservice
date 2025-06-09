/**
 * GrpcLoggingInterceptor
 * -----------------------------------------------------------------------------
 * Interceptor exclusivo para entornos de desarrollo.
 * Loggea automáticamente:
 *  - Nombre del controlador y método gRPC llamado
 *  - Tiempo total de ejecución en milisegundos
 *
 * Este interceptor es útil durante el desarrollo para observar el tráfico
 * gRPC y medir tiempos de respuesta sin instrumentar cada handler manualmente.
 *
 * ⚠️ Se recomienda usar este interceptor **solo en desarrollo**.
 * Puede ser registrado globalmente en `main.ts` o por módulo.
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('gRPC')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isGrpcContext = context.getType<'rpc'>() === 'rpc'
    const isDev = this.isDevelopment()

    if (!isGrpcContext || !isDev) {
      return next.handle()
    }

    const handlerName = context.getHandler().name
    const className = context.getClass().name

    this.logger.log(`📥 Llamada a ${className}.${handlerName}()`)

    const start = Date.now()
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start
        this.logger.log(
          `✅ ${className}.${handlerName}() completado en ${duration}ms`
        )
      })
    )
  }

  /**
   * Determina si la aplicación está corriendo en modo desarrollo.
   * Esta lógica puede ser reemplazada por cualquier otro adaptador centralizado.
   */
  private isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}
