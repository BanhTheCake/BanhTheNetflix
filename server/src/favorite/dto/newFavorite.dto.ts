import { TMediaType } from './../../tmdb/tmdb.api';
import { IsIn, IsNotEmpty } from 'class-validator';

const MediaType = ['tv', 'movie'];

export class NewFavoritesDto {
  @IsNotEmpty()
  @IsIn(MediaType)
  mediaType: TMediaType;

  @IsNotEmpty()
  mediaId: number;

  @IsNotEmpty()
  mediaTitle: string;

  @IsNotEmpty()
  mediaPoster: string;

  @IsNotEmpty()
  mediaRate: number;
}
