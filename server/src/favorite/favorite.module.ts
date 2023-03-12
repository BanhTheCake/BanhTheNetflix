import { FavoriteController } from './controllers/favorite.controller';
import { Module } from '@nestjs/common';
import { FavoriteService } from './services/favorite.service';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
