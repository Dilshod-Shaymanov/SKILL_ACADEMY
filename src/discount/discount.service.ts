import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount) private discountModel: typeof Discount) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return this.discountModel.create(createDiscountDto);
  }

  async findAll() {
    return this.discountModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.discountModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const update = await this.discountModel.update(updateDiscountDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.discountModel.destroy({ where: { id } });
  }
}
