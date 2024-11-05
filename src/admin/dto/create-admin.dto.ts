import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Admin Ismi',
    description: 'Adminning ismini kiriting',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Adminning email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin paroli',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin parolini takrorlang',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: true,
    description: "Admin faolligini ko'rsatadi",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Admin yaratuvchisi ekanligini ko'rsatadi",
  })
  @IsOptional()
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Admin uchun hashlangan refresh token',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;
}
