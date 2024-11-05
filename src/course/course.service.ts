import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseModel: typeof Course) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseModel.create(createCourseDto);
    return course;
  }

  async findAll() {
    return this.courseModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const course = await this.courseModel.findByPk(id, {
      include: { all: true },
    });
    if (!course) {
      throw new NotFoundException(`Kurs topilmadi: #${id}`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const [updatedCount, [updatedCourse]] = await this.courseModel.update(
      updateCourseDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`Yangilash uchun kurs topilmadi: #${id}`);
    }

    return updatedCourse;
  }

  async remove(id: number) {
    const deletedCount = await this.courseModel.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new NotFoundException(`O'chirish uchun kurs topilmadi: #${id}`);
    }

    return { message: `Kurs muvaffaqiyatli o'chirildi: #${id}` };
  }
}
