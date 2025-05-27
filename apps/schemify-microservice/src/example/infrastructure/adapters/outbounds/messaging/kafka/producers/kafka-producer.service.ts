import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

import { firstValueFrom } from 'rxjs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect()
  }

  async onModuleDestroy() {
    await this.kafkaClient.close()
  }

  async emit(topic: string, message: Record<string, any>) {
    await firstValueFrom(this.kafkaClient.emit(topic, message))
  }
}
