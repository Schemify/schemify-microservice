export const kafkaCommonConfig = {
  client: {
    connectionTimeout: 5000,
    requestTimeout: 3000,
    retry: {
      maxRetryTime: 60000,
      initialRetryTime: 1000,
      retries: 10
    },
    run: {
      autoCommit: false,
      partitionsConsumedConcurrently: 3,
      // Continúa incluso si no hay conexión inicial
      waitForLeaders: false
    },
    clientId: 'prueba-microservice',
    brokers: ['kafka1:9092']
  }
}
