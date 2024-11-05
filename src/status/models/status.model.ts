import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../course/models/course.model';
import { Contract } from '../../contract/models/contract.model';
import { Payment } from '../../payment/models/payment.model';

interface IStatusCreationAttr {
  name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, IStatusCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Status ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Pending',
    description: 'Status nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  //

  @HasMany(() => Course)
  courses: Course[];

  //

  @HasMany(() => Contract)
  contracts: Contract[];

  //

  @HasMany(() => Payment)
  payments: Payment[];

  //
}
