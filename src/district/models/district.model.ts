import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';

interface IDistrictCreationAttr {
  name: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    description: 'Tumanning unikal ID raqami',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    description: 'Tumanning nomi',
    example: 'Chilonzor',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  //

  @HasMany(() => Region)
  media: Region[];

  //
}
