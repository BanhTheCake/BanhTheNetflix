import { TMediaType } from './../../tmdb/tmdb.api';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

const mediaType = ['tv', 'movie'];

export class NewReviewDto {
  @IsNotEmpty()
  @IsIn(mediaType)
  mediaType: TMediaType;

  @IsNotEmpty()
  mediaId: number;

  @IsNotEmpty()
  mediaTitle: string;

  @IsNotEmpty()
  mediaPoster: string;

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  content: string;
}
