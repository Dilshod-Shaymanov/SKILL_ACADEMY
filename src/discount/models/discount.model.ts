import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Contract } from '../../contract/models/contract.model';

interface ICreationDiscountAttr {
  code: string;
  description: string;
  percent: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

@Table({ tableName: 'discount' })
export class Discount extends Model<Discount, ICreationDiscountAttr> {
  @ApiProperty({
    example: 1,
    description: 'Chegirma ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'DISCOUNT2024',
    description: 'Chegirma kodi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @ApiProperty({
    example: 'Yangi yil chegirmasi',
    description: 'Chegirma tavsifi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '15',
    description: 'Chegirma foizi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  percent: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Chegirma boshlanish sanasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_date: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Chegirma tugash sanasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_date: string;

  @ApiProperty({
    example: true,
    description: 'Chegirma holati (faol yoki faol emas)',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  //

  @HasMany(() => Contract)
  contracts: Contract[];

  //
}
