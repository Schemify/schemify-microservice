import { PruebaEntity } from '../entities/prueba.entity'
export interface PruebaRepository {
  save(entity: PruebaEntity): Promise<PruebaEntity>
  findById(id: string): Promise<PruebaEntity | null>
  findAll(): Promise<PruebaEntity[]>
  update(id: string, entity: PruebaEntity): Promise<PruebaEntity>
  delete(id: string): Promise<void>
}
