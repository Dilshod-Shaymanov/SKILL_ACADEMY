import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../course/models/course.model';
import { CourseMaterial } from '../../course_material/models/course_material.model';

interface ICreationLessonAttr {
  name: string;
  content: string;
  order: string;
  courseId: number;
}

@Table({ tableName: 'lesson' })
export class Lesson extends Model<Lesson, ICreationLessonAttr> {
  @ApiProperty({
    example: 1,
    description: 'Dars ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Matematika',
    description: 'Dars nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Matematika asoslari',
    description: 'Dars mazmuni',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    example: '1',
    description: 'Darsning tartib raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Kurs Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;
  @BelongsTo(() => Course)
  course: Course;

  //

  @HasMany(() => CourseMaterial)
  courseMaterials: CourseMaterial[];

  //
}
