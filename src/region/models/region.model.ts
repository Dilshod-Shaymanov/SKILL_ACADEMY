import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from '../../district/models/district.model';

interface IRegionCreationAttr {
  name: string;
  districtId: number;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Viloyat unikal id si (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Viloyat nomi',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  //

  @ApiProperty({
    example: 1,
    description: 'Tuman Id (ForiegnKey)',
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  districtId: number;

  @BelongsTo(() => District)
  district: District;

  //
}
