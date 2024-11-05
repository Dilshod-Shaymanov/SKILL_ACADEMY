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
import { Discount } from '../../discount/models/discount.model';
import { Certificate } from '../../certificate/model/certificate.model';
import { Payment } from '../../payment/models/payment.model';
import { User } from '../../users/models/user.model';
import { Course } from '../../course/models/course.model';
import { Status } from '../../status/models/status.model';

interface ICreationContractAttr {
  start_date: string;
  end_date: string;
  amount: string;
  passport: string;
  contract_date: string;
  discountId: number;
  userId: number;
  courseId: number;
  statusId: number;
}

@Table({ tableName: 'contract' })
export class Contract extends Model<Contract, ICreationContractAttr> {
  @ApiProperty({
    example: 1,
    description: 'Shartnoma ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Shartnomaning boshlanish sanasi',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Shartnomaning tugash sanasi',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: string;

  @ApiProperty({
    example: '1000',
    description: 'Shartnomadagi summa',
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount: string;

  @ApiProperty({
    example: 'AB1234567',
    description: "Shartnoma uchun pasport ma'lumoti",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passport: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Shartnoma sanasi',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  contract_date: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Discount Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountId: number;
  @BelongsTo(() => Discount)
  discount: Discount;

  //

  @HasMany(() => Certificate)
  certificates: Certificate[];

  //

  @HasMany(() => Payment)
  payments: Payment[];

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
}
