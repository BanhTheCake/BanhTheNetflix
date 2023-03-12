import { TMediaType } from './../../tmdb/tmdb.api';
import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';

const MediaType = ['tv', 'movie'];

export class ReviewsOfMediaDto {
  @IsNotEmpty()
  @IsIn(MediaType)
  mediaType: TMediaType;

  @IsNotEmpty()
  mediaId: string;
}
