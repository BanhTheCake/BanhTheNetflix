import { MediaListDto } from './../dto/mediaList.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import TmdbServices from 'src/tmdb/tmdb.services';
import { TR } from 'src/utils/type';
import { MediaDetailsDto } from '../dto/mediaDetails.dto';
import { MediaCreditsDto } from '../dto/mediaCredits';
import { MediaVideosDto } from '../dto/mediaVideos';
import { MediaImagesDto } from '../dto/mediaImages';
import { MediaGenresTypeDto } from '../dto/mediaGenresType';
import { MediaSearchDto } from '../dto/mediaSearch';
import { MediaRecommendDto } from '../dto/mediaRecommend.dto';

const handleError = (name: string, error) => {
  if (error.response) throw error;
  console.log('error at ' + name + ' :', error);
  throw new InternalServerErrorException('Something wrong with server !');
};

@Injectable()
export class MediaService {
  async getMediaList(data: MediaListDto, page: string): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaList(
        data.mediaType,
        data.mediaCategory,
        page,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaList', error);
    }
  }

  async getMediaDetails(data: MediaDetailsDto): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaDetails(
        data.mediaType,
        data.mediaId,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaDetails', error);
    }
  }

  async getMediaCredits(data: MediaCreditsDto): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaCredits(
        data.mediaType,
        data.mediaId,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaCredits', error);
    }
  }

  async getMediaVideos(data: MediaVideosDto): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaVideos(
        data.mediaType,
        data.mediaId,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaVideos', error);
    }
  }

  async getMediaImages(data: MediaImagesDto): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaImages(
        data.mediaType,
        data.mediaId,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaImages', error);
    }
  }

  async getMediaRecommends(data: MediaRecommendDto): Promise<TR> {
    try {
      const res = await TmdbServices.getMediaRecommend(
        data.mediaType,
        data.mediaId,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getMediaImages', error);
    }
  }

  async getGenresOfType(data: MediaGenresTypeDto): Promise<TR> {
    try {
      const res = await TmdbServices.getGenres(data.mediaType);
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getGenresOfType', error);
    }
  }

  async searchWithKW(
    data: MediaSearchDto,
    query: string,
    page: string,
  ): Promise<TR> {
    try {
      const res = await TmdbServices.searchWithKeyword(
        data.mediaType,
        page,
        query,
      );
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('getGenresOfType', error);
    }
  }
  async getPersonDetails(personId: string): Promise<TR> {
    try {
      const res = await TmdbServices.getPersonDetails(personId);
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('GetPersonDetails', error);
    }
  }
  async getPersonCombinedCredits(personId: string): Promise<TR> {
    try {
      const res = await TmdbServices.getPersonCombinedCredits(personId);
      return {
        errCode: 0,
        msg: 'Ok',
        data: res.data,
      };
    } catch (error) {
      handleError('GetPersonCombinedCredits', error);
    }
  }
}
