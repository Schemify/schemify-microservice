import { IsString, IsOptional, MinLength } from 'class-validator'

export class UpdateExampleDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string

  @IsOptional()
  @IsString()
  description?: string
}
