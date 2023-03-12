import { NewReviewDto } from './../dto/newReview.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reviews } from 'src/Model/Entities/review.entity';
import { TR } from 'src/utils/type';
import { ReviewsOfMediaDto } from '../dto/reviewsOfMedia.dto';
import paginationFn from 'src/utils/helpers/paginationFn';
import { PaginationDto } from 'src/utils/dto/global.dto';
import { Users } from 'src/Model/Entities/user.entity';

const handleError = (name: string, error: any) => {
  if (error.response) throw error;
  console.log('Error at ' + name + ': ', error);
  throw new InternalServerErrorException('Something wrong with server !');
};

@Injectable()
export class ReviewService {
  constructor(@Inject('REVIEWS') private ReviewModel: typeof Reviews) {}

  async getReviewsOfMedia({
    mediaId,
    mediaType,
    page = 1,
    limit = 4,
  }: ReviewsOfMediaDto & PaginationDto): Promise<TR> {
    try {
      const offset = (page - 1) * limit;
      const reviews = await this.ReviewModel.findAndCountAll({
        where: { mediaType, mediaId },
        offset: offset,
        limit: limit,
        include: [{ model: Users, attributes: { exclude: ['password'] } }],
        order: [['createdAt', 'DESC']],
      });

      const pagination = paginationFn({
        limit: limit,
        page: page,
        total: reviews.count,
      });

      return {
        errCode: 0,
        msg: 'Ok',
        data: {
          reviews: reviews.rows,
          ...pagination,
        },
      };
    } catch (error) {
      handleError('getReviewsOfMedia', error);
    }
  }

  async getAllReviews(userId: string): Promise<TR> {
    try {
      const reviews = await this.ReviewModel.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: reviews,
      };
    } catch (error) {
      handleError('getAllReviews', error);
    }
  }

  async createNewReview(data: NewReviewDto, userId: string): Promise<TR> {
    try {
      await this.ReviewModel.create({ ...data, userId });
      return {
        errCode: 0,
        msg: 'Create review success !',
      };
    } catch (error) {
      handleError('createNewReview', error);
    }
  }

  async removeReviewById(reviewId: string): Promise<TR> {
    try {
      await this.ReviewModel.destroy({ where: { id: reviewId } });
      return {
        errCode: 0,
        msg: 'Delete review success !',
      };
    } catch (error) {
      handleError('removeReviewById', error);
    }
  }

  async updateReviewById(reviewId: string, content: string): Promise<TR> {
    try {
      const currentReview = await this.ReviewModel.findOne({
        where: { id: reviewId },
      });
      if (!currentReview) throw new BadRequestException();
      currentReview.content = content;
      await currentReview.save();
      return {
        errCode: 0,
        msg: 'Ok',
        data: currentReview,
      };
    } catch (error) {
      handleError('updateReviewById', error);
    }
  }
}
