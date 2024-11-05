import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ICreationAdminAttr {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  photo: string;
  telegram_link: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, ICreationAdminAttr> {
  @ApiProperty({
    example: 1,
    description: 'Admin ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Admin Ismi',
    description: 'Adminning ismi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Adminning email manzili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin paroli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({
    example: true,
    description: "Admin faolligini ko'rsatadi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Admin yaratuvchisi ekanligini ko'rsatadi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Admin uchun hashlangan refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
