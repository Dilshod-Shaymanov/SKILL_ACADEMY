import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '../../contract/models/contract.model';
import { Status } from '../../status/models/status.model';

interface ICreatePaymentAttr {
  amount: number;
  payment_date: string;
  payment_method: string;
  terms: string;
  contractId: number;
  statusId: number;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, ICreatePaymentAttr> {
  @ApiProperty({
    example: 1,
    description: "To'lov ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 100,
    description: "To'lov miqdori",
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @ApiProperty({
    example: '2024-11-01',
    description: "To'lov sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  payment_date: string;

  @ApiProperty({
    example: 'credit_card',
    description: "To'lov usuli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_method: string;

  @ApiProperty({
    example: '12 months',
    description: "To'lov shartlari",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  terms: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Shartnoma Id raqami (ForeignKey)',
  })
  @ForeignKey(() => Contract)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  contractId: number;
  @BelongsTo(() => Contract)
  contract: Contract;

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
