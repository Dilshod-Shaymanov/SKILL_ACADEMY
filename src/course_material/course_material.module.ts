import { Module } from '@nestjs/common';
import { CourseMaterialService } from './course_material.service';
import { CourseMaterialController } from './course_material.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseMaterial } from './models/course_material.model';

@Module({
  imports: [SequelizeModule.forFeature([CourseMaterial])],
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService],
})
export class CourseMaterialModule {}
