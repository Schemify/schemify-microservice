import { PruebaEntity } from '../../domain/entities/prueba.entity'

import { CreatePruebaDto } from '../dtos/create-prueba.dto'
import { UpdatePruebaDto } from '../dtos/update-prueba.dto'

// TODO: Cambiar por tus propias importaciones de proto
import {
  CreatePruebaDto as ProtoCreatePruebaDto,
  UpdatePruebaDto as ProtoUpdatePruebaDto,
  Prueba as ProtoPrueba
} from 'libs/proto/generated'

export class PruebaMapper {
  protoToCreateDto(protoDto: ProtoCreatePruebaDto): CreatePruebaDto {
    return {
      name: protoDto.name,
      description: protoDto.description
      // Mapear otros campos según sea necesario
    }
  }

  protoToUpdateDto(protoDto: ProtoUpdatePruebaDto): UpdatePruebaDto {
    return {
      name: protoDto.prueba?.name || undefined,
      description: protoDto.prueba?.description || undefined
    }
  }

  entityToProtoResponse(entity: PruebaEntity): ProtoPrueba {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description.value
      // createdAt: entity.createdAt.toISOString(),
      // updatedAt: entity.updatedAt?.toISOString() || ''
    }
  }
}
