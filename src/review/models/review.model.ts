import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/user.model';
import { Course } from '../../course/models/course.model';

interface ICreationReviewAttr {
  rating: string;
  comment: string;
  likes: number;
  helpfull_count: string;
  report_count: string;
  userId: number;
  courseId: number;
}

@Table({ tableName: 'review' })
export class Review extends Model<Review, ICreationReviewAttr> {
  @ApiProperty({
    example: 1,
    description: 'Review ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '5',
    description: 'Rating for the review (1 to 5)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rating: string;

  @ApiProperty({
    example: 'Great product!',
    description: 'Comment about the product',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ApiProperty({
    example: 10,
    description: 'Number of likes the review received',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  likes: number;

  @ApiProperty({
    example: '2',
    description: 'Count of helpful votes',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  helpfull_count: string;

  @ApiProperty({
    example: '1',
    description: 'Count of reports',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  report_count: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi Id raqami (ForeignKey)',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;

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
}
