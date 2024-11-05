import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
