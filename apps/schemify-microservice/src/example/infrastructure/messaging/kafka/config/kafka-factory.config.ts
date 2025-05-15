import { KafkaOptions, Transport } from '@nestjs/microservices'
import { KafkaConfig, Partitioners } from 'kafkajs'

/* ────────────────────────────────────────────────────────
 🧱 Config base común para todos los clientes Kafka
────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────
 ✅ Config completo de Kafka Consumer 
────────────────────────────────────────────────────────── */
export const kafkaConsumerOptions = (
  clientId: string,
  groupId: string,
  brokers: string[]
): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: createKafkaClientConfig(clientId, brokers),
    consumer: {
      groupId,
      allowAutoTopicCreation: false
    },
    subscribe: { fromBeginning: true },
    run: { autoCommit: false, partitionsConsumedConcurrently: 3 }
  }
})

/* ────────────────────────────────────────────────────────
 ✅ Config completo de Kafka Producer 
────────────────────────────────────────────────────────── */
export const kafkaProducerOptions = (
  name: string,
  clientId: string,
  brokers: string[]
): KafkaOptions & { name: string } => ({
  name,
  transport: Transport.KAFKA,
  options: {
    client: createKafkaClientConfig(clientId, brokers),
    producer: {
      allowAutoTopicCreation: true,
      idempotent: true,
      retry: { retries: 3 },
      createPartitioner: Partitioners.DefaultPartitioner
    }
  }
})
