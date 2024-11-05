import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsIn,
  MinLength,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Dilshod',
    description: 'Foydalanuvchining ismi',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Shaymanov',
    description: 'Foydalanuvchining familiyasi',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'dilshod@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchining paroli',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchining parolini takrorleng',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchining telefon raqami',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Foydalanuvchining fotosi (URL formatida)',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: 25,
    description: 'Foydalanuvchining yoshi',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: '2000-01-01',
    description: "Foydalanuvchining tug'ilgan sanasi (YYYY-MM-DD formatida)",
  })
  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @ApiProperty({
    example: 'erkak',
    description: 'Foydalanuvchining jinsi',
    enum: ['erkak', 'ayol'],
  })
  @IsIn(['erkak', 'ayol'])
  @IsNotEmpty()
  gender: 'erkak' | 'ayol';

  @ApiProperty({
    example: 'USER',
    description: 'Foydalanuvchiga berilayotgan dastlabki role',
  })
  @IsString()
  @IsNotEmpty()
  role_value: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi faolligini ko'rsatadi",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 'activationLink String',
    description: 'Foydalanuvchi aktivlashtirish havolasi',
  })
  @IsOptional()
  @IsString()
  activation_link: string;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Foydalanuvchi uchun hashlangan refresh token',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;
}
