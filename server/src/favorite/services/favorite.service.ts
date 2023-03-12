import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Favorites } from 'src/Model/Entities/favorite.entity';
import { TR } from 'src/utils/type';
import { NewFavoritesDto } from '../dto/newFavorite.dto';

const handleError = (name: string, error: any) => {
  if (error.response) throw error;
  console.log('Error at ' + name + ': ', error);
  throw new InternalServerErrorException('Something wrong with server !');
};

@Injectable()
export class FavoriteService {
  constructor(@Inject('FAVORITES') private favoritesModel: typeof Favorites) {}

  async getAllFavorites(userId: string): Promise<TR> {
    try {
      const favorites = await this.favoritesModel.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: {
          favorites,
        },
      };
    } catch (error) {
      handleError('getAllFavorites', error);
    }
  }

  async createNewFavorite(data: NewFavoritesDto, userId: string): Promise<TR> {
    try {
      const duplicateFavorite = await this.favoritesModel.findOne({
        where: { mediaId: data.mediaId },
      });
      if (duplicateFavorite)
        throw new BadRequestException('Favorite has been add in out system !');
      await this.favoritesModel.create({ ...data, userId: userId });
      return {
        errCode: 0,
        msg: 'Create favorite success !',
      };
    } catch (error) {
      handleError('createNewFavorite', error);
    }
  }

  async removeFavoriteByMediaId(mediaId: string): Promise<TR> {
    try {
      await this.favoritesModel.destroy({ where: { mediaId: mediaId } });
      return {
        errCode: 0,
        msg: 'Remove favorite success !',
      };
    } catch (error) {
      handleError('removeFavoriteByMediaId', error);
    }
  }
}
