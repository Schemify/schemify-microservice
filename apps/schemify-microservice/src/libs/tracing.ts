// // src/metrics.ts
// import { MeterProvider } from '@opentelemetry/sdk-metrics'
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
// import { Resource } from '@opentelemetry/resources'

// // Recurso con metadatos del servicio
// const resource = new Resource({
//   'service.name': 'schemify-microservice'
// })

// // Exportador Prometheus (pull-based)
// const prometheusExporter = new PrometheusExporter(
//   {
//     port: 9464,
//     endpoint: '/metrics'
//   },
//   () => {
//     console.log('✅ Prometheus endpoint: http://localhost:9464/metrics')
//   }
// )

// // Provider de métricas
// const meterProvider = new MeterProvider({ resource })
// meterProvider.addMetricReader(prometheusExporter)

// // Medidor e instrumento
// const meter = meterProvider.getMeter('schemify')
// const requestCounter = meter.createCounter('example_requests_total', {
//   description: 'Total de requests en ExampleService'
// })

// export { requestCounter }
