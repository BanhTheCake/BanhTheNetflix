import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { MediaListDto } from '../dto/mediaList.dto';
import { MediaDetailsDto } from '../dto/mediaDetails.dto';
import { MediaCreditsDto } from '../dto/mediaCredits';
import { MediaVideosDto } from '../dto/mediaVideos';
import { MediaImagesDto } from '../dto/mediaImages';
import { MediaGenresTypeDto } from '../dto/mediaGenresType';
import { MediaSearchDto } from '../dto/mediaSearch';
import { MediaRecommendDto } from '../dto/mediaRecommend.dto';

@Controller('media')
export class MediaController {
  constructor(private MediaService: MediaService) {}

  @Get('list/:mediaType/:mediaCategory')
  getMediaList(@Param() data: MediaListDto, @Query('page') page: string = '1') {
    return this.MediaService.getMediaList(data, page);
  }

  @Get('details/:mediaType/:mediaId')
  getMediaDetails(@Param() data: MediaDetailsDto) {
    return this.MediaService.getMediaDetails(data);
  }

  @Get('credits/:mediaType/:mediaId')
  getMediaCredits(@Param() data: MediaCreditsDto) {
    return this.MediaService.getMediaCredits(data);
  }

  @Get('videos/:mediaType/:mediaId')
  getMediaVideos(@Param() data: MediaVideosDto) {
    return this.MediaService.getMediaVideos(data);
  }

  @Get('images/:mediaType/:mediaId')
  getMediaImages(@Param() data: MediaImagesDto) {
    return this.MediaService.getMediaImages(data);
  }

  @Get('recommends/:mediaType/:mediaId')
  getMediaRecommends(@Param() data: MediaRecommendDto) {
    return this.MediaService.getMediaRecommends(data);
  }

  @Get('genres/:mediaType')
  getGenresOfType(@Param() data: MediaGenresTypeDto) {
    return this.MediaService.getGenresOfType(data);
  }

  @Get('search/:mediaType')
  searchWithKeyword(
    @Param() data: MediaSearchDto,
    @Query() { query, page = '1' }: { page: string; query: string },
  ) {
    return this.MediaService.searchWithKW(data, query, page);
  }

  @Get('person/details/:personId')
  getPersonDetails(@Param('personId') personId: string) {
    return this.MediaService.getPersonDetails(personId);
  }

  @Get('person/combinedCredits/:personId')
  getPersonCombinedCredits(@Param('personId') personId: string) {
    return this.MediaService.getPersonCombinedCredits(personId);
  }
}
