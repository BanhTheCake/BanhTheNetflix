import { Injectable, Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
