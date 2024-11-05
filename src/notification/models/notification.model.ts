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
import { Language } from '../../language/models/language.model';

interface ICreationNotificationAttr {
  title: string;
  message: string;
  send_method: string;
  send_time: string;
  userId: number;
  languageId: number;
}

@Table({ tableName: 'notification' })
export class Notification extends Model<
  Notification,
  ICreationNotificationAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Xabarnoma ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: "Yangi dars e'lon qilindi",
    description: 'Xabarnomaning sarlavhasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: "Bugun yangi dars o'tkaziladi.",
    description: 'Xabarnomaning matni',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @ApiProperty({
    example: 'email',
    description: 'Xabarnoma yuborish usuli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  send_method: string;

  @ApiProperty({
    example: '2024-11-01T10:00:00Z',
    description: 'Xabarnomaning yuborish vaqti',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  send_time: string;

  //

  @ApiProperty({
    example: 1,
    description: 'User Id (ForiegnKey)',
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
    description: 'Til Id (ForiegnKey)',
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
