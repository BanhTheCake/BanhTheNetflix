import { TMediaType, TMediaCategory } from './../../tmdb/tmdb.api';
import { IsNotEmpty, IsIn } from 'class-validator';

const MediaType = ['tv', 'movie', 'person'];

export class MediaSearchDto {
  @IsNotEmpty()
  @IsIn(MediaType)
  mediaType: TMediaType;
}
