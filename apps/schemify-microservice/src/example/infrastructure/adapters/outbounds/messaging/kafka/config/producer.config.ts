import { KafkaOptions, Transport } from '@nestjs/microservices'
import { KafkaConfig, Partitioners } from 'kafkajs'

export interface KafkaProducerParams {
  name: string
  clientId: string
  brokers: string[]
  retries?: number
}

export const createKafkaClientConfig = (
  clientId: string,
  brokers: string[]
): KafkaConfig => ({
  clientId,
  brokers,
  connectionTimeout: 5000,
  requestTimeout: 3000,
  retry: {
    maxRetryTime: 60000,
    initialRetryTime: 1000,
    retries: 10
  }
})

export const kafkaProducerOptions = ({
  name,
  clientId,
  brokers,
  retries = 3
}: KafkaProducerParams): KafkaOptions & { name: string } => ({
  name,
  transport: Transport.KAFKA,
  options: {
    client: createKafkaClientConfig(clientId, brokers),
    producer: {
      allowAutoTopicCreation: true,
      idempotent: true,
      retry: { retries },
      createPartitioner: Partitioners.DefaultPartitioner
    }
  }
})
