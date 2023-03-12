import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { AccessToken, JWT } from 'src/auth/services/jwt.service';
import { User } from 'src/utils/decorators/user.decorator';
import { PaginationDto } from 'src/utils/dto/global.dto';
import { NewReviewDto } from '../dto/newReview.dto';
import { ReviewsOfMediaDto } from '../dto/reviewsOfMedia.dto';
import { UpdateReviewDto } from '../dto/updateReview.dto';
import { ReviewService } from '../services/review.service';
@Controller('review')
export class ReviewController {
  constructor(private ReviewService: ReviewService) {}

  @Get('media/:mediaType/:mediaId')
  getReviewsOfMedia(
    @Param()
    { mediaType, mediaId }: ReviewsOfMediaDto,
    @Query() { page, limit }: PaginationDto,
  ) {
    return this.ReviewService.getReviewsOfMedia({
      mediaType,
      mediaId,
      page,
      limit,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Get('list')
  getAllReviews(@User() data: JWT<AccessToken>) {
    return this.ReviewService.getAllReviews(data.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  createNewReview(
    @Body() data: NewReviewDto,
    @User() { userId }: JWT<AccessToken>,
  ) {
    return this.ReviewService.createNewReview(data, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('remove/:reviewId')
  removeReviewById(@Param('reviewId') reviewId: string) {
    return this.ReviewService.removeReviewById(reviewId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update/:reviewId')
  updateReviewById(
    @Param('reviewId') reviewId: string,
    @Body() { content }: UpdateReviewDto,
  ) {
    return this.ReviewService.updateReviewById(reviewId, content);
  }
}
