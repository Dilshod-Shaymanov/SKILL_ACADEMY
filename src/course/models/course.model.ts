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
import { Contract } from '../../contract/models/contract.model';
import { Review } from '../../review/models/review.model';
import { Lesson } from '../../lesson/models/lesson.model';
import { Category } from '../../category/models/category.model';
import { Status } from '../../status/models/status.model';
import { Language } from '../../language/models/language.model';

interface ICourseCreationAttrs {
  name: string;
  description: string;
  price: string;
  duration: string;
  telegram_link: string;
  level: string;
  categoryId: number;
  statusId: number;
  languageId: number;
}

@Table({ tableName: 'courses' })
export class Course extends Model<Course, ICourseCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Kurs ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'JavaScript asoslari',
    description: 'Kurs nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "Bu kurs JavaScript asoslarini o'rgatadi",
    description: 'Kurs tavsifi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '100',
    description: 'Kurs narxi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: '30 soat',
    description: 'Kurs davomiyligi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

  @ApiProperty({
    example: 'https://t.me/joinchat/ABCDE12345',
    description: 'Telegram havolasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telegram_link: string;

  @ApiProperty({
    example: "Boshlang'ich",
    description: 'Kurs darajasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  level: string;

  //

  @HasMany(() => Contract)
  contracts: Contract[];

  //

  @HasMany(() => Review)
  reviews: Review[];

  //

  @HasMany(() => Lesson)
  lessons: Lesson[];

  //

  @ApiProperty({
    example: 1,
    description: 'Kategorya Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;
  @BelongsTo(() => Category)
  category: Category;

  //

  @ApiProperty({
    example: 1,
    description: 'Status Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;
  @BelongsTo(() => Status)
  status: Status;

  //

  @ApiProperty({
    example: 1,
    description: 'Til Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageId: number;
  @BelongsTo(() => Language)
  language: Language;

  //
}
