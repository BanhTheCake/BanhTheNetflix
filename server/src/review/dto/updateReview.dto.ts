import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  content: string;
}
