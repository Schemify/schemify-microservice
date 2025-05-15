/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
import { Controller } from '@nestjs/common'

// TODO: Cambiar por tus propias importaciones de proto
import {
  PruebaServiceController,
  GetPruebaByIdDto,
  CreatePruebaDto as ProtoCreatePruebaDto,
  UpdatePruebaDto as ProtoUpdatePruebaDto,
  PruebaServiceControllerMethods,
  Prueba,
  Pruebas
} from '@app/proto'

import { PruebaApplicationService } from '../../application/services/prueba-application.service'
import { PruebaMapper } from '../../application/mappers/prueba.mapper'

import { KafkaProducerService } from '../messaging/kafka/producers/kafka-producer.service'

@Controller()
@PruebaServiceControllerMethods()
export class PruebaGrpcController implements PruebaServiceController {
  constructor(
    private readonly applicationService: PruebaApplicationService,
    private readonly mapper: PruebaMapper,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  async createPrueba(protoDto: ProtoCreatePruebaDto): Promise<Prueba> {
    try {
      const appDto = this.mapper.protoToCreateDto(protoDto)
      const entity = await this.applicationService.create(appDto)

      const proto = this.mapper.entityToProtoResponse(entity)

      // 👇 Emitir mensaje Kafka
      await this.kafkaProducer.emitPruebaCreated('prueba-created', proto)

      return proto
    } catch (error) {
      this.handleGrpcError(error)
    }
  }

  async getAllPrueba(): Promise<PruebaS> {
    try {
      const entities = await this.applicationService.findAll()
      return {
        pruebas: entities.map((entity) =>
          this.mapper.entityToProtoResponse(entity)
        )
      }
    } catch (error) {
      this.handleGrpcError(error)
    }
  }

  async getPruebaById({ id }: GetPruebaByIdDto): Promise<Prueba> {
    try {
      const entity = await this.applicationService.findOne(id)
      return this.mapper.entityToProtoResponse(entity)
    } catch (error) {
      this.handleGrpcError(error)
    }
  }

  async deletePrueba({ id }: GetPruebaByIdDto): Promise<void> {
    try {
      await this.applicationService.delete(id)
    } catch (error) {
      this.handleGrpcError(error)
    }
  }

  async updatePrueba(protoDto: ProtoUpdatePruebaDto): Promise<Prueba> {
    try {
      if (!protoDto.id) {
        throw new Error('ID is required for update')
      }

      const appDto = this.mapper.protoToUpdateDto(protoDto)

      const entity = await this.applicationService.update(protoDto.id, appDto)
      return this.mapper.entityToProtoResponse(entity)
    } catch (error) {
      this.handleGrpcError(error)
    }
  }

  private handleGrpcError(error: Error): never {
    throw new Error(`GRPC Error: ${error.message}`)
  }
}
