import { TMediaType, TMediaCategory } from './../../tmdb/tmdb.api';
import { IsNotEmpty, IsIn } from 'class-validator';

const MediaType = ['tv', 'movie'];
const MediaCategory = ['popular', 'top_rated'];

export class MediaListDto {
  @IsNotEmpty()
  @IsIn(MediaType)
  mediaType: TMediaType;

  @IsNotEmpty()
  @IsIn(MediaCategory)
  mediaCategory: TMediaCategory;
}
