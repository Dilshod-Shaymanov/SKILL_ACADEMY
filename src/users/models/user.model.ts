import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/models/role.model';
import { UserRole } from '../../user_role/models/user_role.model';
import { Notification } from '../../notification/models/notification.model';
import { Region } from '../../region/models/region.model';
import { Contract } from '../../contract/models/contract.model';
import { Review } from '../../review/models/review.model';

interface ICreationUserAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  photo: string;
  age: number;
  birth_date: string;
  gender: 'erkak' | 'ayol';
  role_value: string;
  is_active: boolean;
  activation_link: string;
  hashed_refresh_token: string;
  regionId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, ICreationUserAttr> {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Dilshod',
    description: 'Foydalanuvchining ismi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'Shaymanov',
    description: 'Foydalanuvchining familiyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'dilshod@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchining paroli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchining telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Foydalanuvchining fotosi (URL formatida)',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: 25,
    description: 'Foydalanuvchining yoshi',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @ApiProperty({
    example: '2000-01-01',
    description: "Foydalanuvchining tug'ilgan sanasi (YYYY-MM-DD formatida)",
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birth_date: string;

  @ApiProperty({
    example: 'erkak',
    description: 'Foydalanuvchining jinsi',
    enum: ['erkak', 'ayol'],
  })
  @Column({
    type: DataType.ENUM('erkak', 'ayol'),
    allowNull: false,
  })
  gender: 'erkak' | 'ayol';

  @ApiProperty({
    example: 'USER',
    description: 'Foydalanuvchi dastlabki role',
  })
  @Column({ type: DataType.STRING })
  role_value: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchining faolligini ko'rsatadi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'activationLinkString',
    description: 'Foydalanuvchi aktivlashtirish havolasi',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Foydalanuvchi uchun hashlangan refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  //

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  //

  @HasMany(() => Notification)
  notification: Notification[];

  //

  @ApiProperty({
    example: 1,
    description: 'Region Id (ForiegnKey)',
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  //

  @HasMany(() => Contract)
  contracts: Contract[];

  //

  @HasMany(() => Review)
  reviews: Review[];

  //
}
