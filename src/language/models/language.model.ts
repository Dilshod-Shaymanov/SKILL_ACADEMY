import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Course } from '../../course/models/course.model';
import { Notification } from '../../notification/models/notification.model';

interface ILanueageCreationAttr {
  name: string;
}

@Table({ tableName: 'language' })
export class Language extends Model<Language, ILanueageCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Tilni unikal id si (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Russian',
    description: 'Til nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  //

  @HasMany(() => Course)
  courses: Course[];

  //

  @HasMany(() => Notification)
  notifications: Notification[];

  //
}
