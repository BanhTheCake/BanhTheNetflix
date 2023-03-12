import { TMediaType, TMediaCategory } from './../../tmdb/tmdb.api';
import { IsNotEmpty, IsIn } from 'class-validator';

const MediaType = ['tv', 'movie'];

export class MediaVideosDto {
  @IsNotEmpty()
  @IsIn(MediaType)
  mediaType: TMediaType;

  @IsNotEmpty()
  mediaId: string;
}
