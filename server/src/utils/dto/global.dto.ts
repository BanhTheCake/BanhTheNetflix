import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  page: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  limit: number;
}
