import { AccessTokenGuard } from './../../auth/guards/accessToken.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewFavoritesDto } from '../dto/newFavorite.dto';
import { FavoriteService } from '../services/favorite.service';
import { User } from 'src/utils/decorators/user.decorator';
import { AccessToken, JWT } from 'src/auth/services/jwt.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private FavoriteService: FavoriteService) {}

  @UseGuards(AccessTokenGuard)
  @Get('list')
  getAllFavorites(@User() data: JWT<AccessToken>) {
    return this.FavoriteService.getAllFavorites(data.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  createNewFavorite(
    @Body() data: NewFavoritesDto,
    @User() { userId }: JWT<AccessToken>,
  ) {
    return this.FavoriteService.createNewFavorite(data, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('remove/:mediaId')
  removeFavoriteByMediaId(@Param('mediaId') mediaId: string) {
    return this.FavoriteService.removeFavoriteByMediaId(mediaId);
  }
}
