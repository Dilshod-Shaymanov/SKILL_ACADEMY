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

interface ICreationCertificateAttr {
  issue_date: string;
  certificate_code: string;
  completed: string;
  grade: string;
  teacher_name: string;
  duration: string;
  contractId: number;
}

@Table({ tableName: 'certificate' })
export class Certificate extends Model<Certificate, ICreationCertificateAttr> {
  @ApiProperty({
    example: 1,
    description: 'Sertifikat ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '2023-10-01',
    description: 'Sertifikat berilgan sana',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  issue_date: string;

  @ApiProperty({
    example: 'CERT123456',
    description: 'Sertifikatning noyob kodi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  certificate_code: string;

  @ApiProperty({
    example: 'true',
    description: 'Kursni tugatganlik holati',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  completed: string;

  @ApiProperty({
    example: 'A',
    description: 'Bahosi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  grade: string;

  @ApiProperty({
    example: 'Shahrizoda Karimova',
    description: "O'qituvchining ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  teacher_name: string;

  @ApiProperty({
    example: '40 soat',
    description: 'Davomiyligi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

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
}
