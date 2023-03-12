import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { FavoriteModule } from './favorite/favorite.module';
import { MediaModule } from './Media/media.module';
import { ModelsModule } from './Model/model.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MediaModule,
    DatabaseModule,
    ModelsModule,
    AuthModule,
    FavoriteModule,
    ReviewModule,
  ],
})
export class AppModule {}
