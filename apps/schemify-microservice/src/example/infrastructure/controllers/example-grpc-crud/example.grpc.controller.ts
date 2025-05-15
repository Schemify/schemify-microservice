/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */

import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { example } from '@app/proto'
import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

import { CreateExampleCommand } from '@microservice/schemify-microservice/example/application/commands/create-example/create-example.command'
import { UpdateExampleCommand } from '@microservice/schemify-microservice/example/application/commands/update-example/update-example.command'
import { DeleteExampleCommand } from '@microservice/schemify-microservice/example/application/commands/delete-example/delete-example.command'
import { GetExampleByIdQuery } from '@microservice/schemify-microservice/example/application/queries/get-example-by-id/get-example-by-id.query'
import { GetExamplesByCursorQuery } from '@microservice/schemify-microservice/example/application/queries/get-examples-by-cursor/get-examples-by-cursor.query'

import { GetAllExamplesQuery } from '@microservice/schemify-microservice/example/application/queries/get-all-examples/get-all-examples.query'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

import { CursorResult } from '@microservice/schemify-microservice/libs/shared/interfaces/pagination/cursor-result.interface'

@Controller()
@example.ExampleServiceControllerMethods()
export class ExampleGrpcController implements example.ExampleServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: ExampleMapper
  ) {}

  async createExample(
    request: example.CreateExampleDto
  ): Promise<example.Example> {
    const props = this.mapper.protoToProps(request)
    const command = new CreateExampleCommand(
      props.name.value,
      props.description.value
    )
    const entity = await this.commandBus.execute(command)
    return this.mapper.entityToProto(entity)
  }

  async updateExample(
    request: example.UpdateExampleDto
  ): Promise<example.Example> {
    const props = this.mapper.protoToProps(request.example!)
    const command = new UpdateExampleCommand(
      request.id,
      props.name.value,
      props.description.value
    )
    const entity = await this.commandBus.execute(command)
    return this.mapper.entityToProto(entity)
  }

  async deleteExample(
    request: example.GetExampleByIdDto
  ): Promise<example.ExampleEmpty> {
    const command = new DeleteExampleCommand(request.id)
    await this.commandBus.execute(command)
    return {}
  }

  async getExampleById(
    request: example.GetExampleByIdDto
  ): Promise<example.Example> {
    const query = new GetExampleByIdQuery({ id: request.id })
    const entity = await this.queryBus.execute(query)
    return this.mapper.entityToProto(entity)
  }

  async getAllExamples(): Promise<example.Examples> {
    const entities = await this.queryBus.execute<
      GetAllExamplesQuery,
      ExampleEntity[]
    >(new GetAllExamplesQuery())
    return {
      examples: entities.map((e) => this.mapper.entityToProto(e))
    }
  }

  async getExamplesByCursor(
    request: example.CursorPaginationRequest
  ): Promise<example.CursorPaginatedExamples> {
    const query = new GetExamplesByCursorQuery({
      afterId: request.afterId,
      limit: request.limit
    })

    const { items, nextCursor, hasMore } = await this.queryBus.execute<
      GetExamplesByCursorQuery,
      CursorResult<ExampleEntity>
    >(query)

    return {
      examples: items.map((e) => this.mapper.entityToProto(e)),
      nextCursor: nextCursor ?? '',
      hasMore
    }
  }
}

// import { Controller } from '@nestjs/common'
// import { example } from '@app/proto/services/'
// import { ExampleApplicationService } from '../../application/services/example-application.service'
// import { ExampleMapper } from '../../application/mappers/example.mapper'

// import { KafkaProducerService } from '../messaging/kafka/producers/kafka-producer.service'

// @Controller()
// @ExampleServiceControllerMethods()
// export class ExampleGrpcController implements example.ExampleServiceController {
//   constructor(
//     private readonly applicationService: ExampleApplicationService,
//     private readonly mapper: ExampleMapper,
//     private readonly kafkaProducer: KafkaProducerService
//   ) {}

//   async createExample(protoDto: ProtoCreateExampleDto): Promise<Example> {
//     try {
//       const appDto = this.mapper.protoToCreateDto(protoDto)
//       const entity = await this.applicationService.create(appDto)

//       const proto = this.mapper.entityToProtoResponse(entity)

//       // 👇 Emitir mensaje Kafka
//       await this.kafkaProducer.emitExampleCreated('example-created', proto)

//       return proto
//     } catch (error) {
//       this.handleGrpcError(error)
//     }
//   }

//   async getAllExamples(): Promise<Examples> {
//     try {
//       const entities = await this.applicationService.findAll()
//       return {
//         examples: entities.map((entity) =>
//           this.mapper.entityToProtoResponse(entity)
//         )
//       }
//     } catch (error) {
//       this.handleGrpcError(error)
//     }
//   }

//   async getExampleById({ id }: GetExampleByIdDto): Promise<Example> {
//     try {
//       const entity = await this.applicationService.findOne(id)
//       return this.mapper.entityToProtoResponse(entity)
//     } catch (error) {
//       this.handleGrpcError(error)
//     }
//   }

//   async deleteExample({ id }: example.GetExampleByIdDto): Promise<void> {
//     try {
//       await this.applicationService.delete(id)
//     } catch (error) {
//       this.handleGrpcError(error)
//     }
//   }

//   async updateExample(protoDto: ProtoUpdateExampleDto): Promise<Example> {
//     try {
//       if (!protoDto.id) {
//         throw new Error('ID is required for update')
//       }

//       const appDto = this.mapper.protoToUpdateDto(protoDto)

//       const entity = await this.applicationService.update(protoDto.id, appDto)
//       return this.mapper.entityToProtoResponse(entity)
//     } catch (error) {
//       this.handleGrpcError(error)
//     }
//   }

//   private handleGrpcError(error: Error): never {
//     throw new Error(`GRPC Error: ${error.message}`)
//   }
// }
