import { ReviewController } from './controllers/review.controller';
import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
