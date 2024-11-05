import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private lessonModel: typeof Lesson) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonModel.create(createLessonDto);
  }

  findAll() {
    return this.lessonModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.lessonModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const update = await this.lessonModel.update(updateLessonDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.lessonModel.destroy({ where: { id } });
  }
}
