import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePruebaDto } from '../dtos/create-prueba.dto'
import { PruebaEntity } from '../../domain/entities/prueba.entity'
import { PruebaRepository } from '../../domain/repositories/prueba.repository'

@Injectable()
export class PruebaApplicationService {
  constructor(
    @Inject('PruebaRepository') private readonly repository: PruebaRepository
  ) {}

  async create(dto: CreatePruebaDto): Promise<PruebaEntity> {
    const prueba = PruebaEntity.create(dto)
    return this.repository.save(prueba)
  }

  async findOne(id: string): Promise<PruebaEntity> {
    const entity = await this.repository.findById(id)

    if (!entity) {
      throw new NotFoundException(`Prueba with id ${id} not found`)
    }

    return entity
  }

  async findAll(): Promise<PruebaEntity[]> {
    return this.repository.findAll()
  }

  async update(
    id: string,
    dto: Partial<CreatePruebaDto>
  ): Promise<PruebaEntity> {
    const entity = await this.findOne(id)
    entity.update(dto)
    return this.repository.save(entity)
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOne(id)

    try {
      if (!entity) {
        throw new NotFoundException(`Prueba with id ${id} not found`)
      }
      await this.repository.delete(id)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new Error(`Error deleting prueba with id ${id}: ${error.message}`)
    }
  }
}
