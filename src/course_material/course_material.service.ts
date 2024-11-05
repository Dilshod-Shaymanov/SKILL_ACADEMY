import { Injectable } from '@nestjs/common';
import { CreateCourseMaterialDto } from './dto/create-course_material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course_material.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CourseMaterial } from './models/course_material.model';

@Injectable()
export class CourseMaterialService {
  constructor(
    @InjectModel(CourseMaterial)
    private courseMaterialModel: typeof CourseMaterial,
  ) {}

  create(createCourseMaterialDto: CreateCourseMaterialDto) {
    return this.courseMaterialModel.create(createCourseMaterialDto);
  }

  findAll() {
    return this.courseMaterialModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.courseMaterialModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateCourseMaterialDto: UpdateCourseMaterialDto) {
    const update = await this.courseMaterialModel.update(
      updateCourseMaterialDto,
      {
        where: { id },
        returning: true,
      },
    );
    return update;
  }

  remove(id: number) {
    return this.courseMaterialModel.destroy({ where: { id } });
  }
}
