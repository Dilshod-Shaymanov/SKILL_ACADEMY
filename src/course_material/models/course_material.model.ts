import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lesson/models/lesson.model';

interface ICreationCourseMaterialAttr {
  title: string;
  description: string;
  upload_date: string;
  duration: string;
  size: string;
  lessonId: number;
}

@Table({ tableName: 'course_material' })
export class CourseMaterial extends Model<
  CourseMaterial,
  ICreationCourseMaterialAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Material ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'JavaScript Darslari',
    description: 'Material nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'JavaScript asoslari va amaliy darslar',
    description: 'Material tavsifi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '2024-11-01',
    description: 'Yuklash sanasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  upload_date: string;

  @ApiProperty({
    example: '2 soat 30 daqiqa',
    description: 'Material davomiyligi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

  @ApiProperty({
    example: '500MB',
    description: 'Material hajmi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string;

  //
  @ApiProperty({
    example: 1,
    description: 'Dars Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lessonId: number;
  @BelongsTo(() => Lesson)
  lesson: Lesson;

  //
}
