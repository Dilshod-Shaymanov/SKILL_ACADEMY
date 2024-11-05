import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  findAll() {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.reviewModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const update = await this.reviewModel.update(updateReviewDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.reviewModel.destroy({ where: { id } });
  }
}
