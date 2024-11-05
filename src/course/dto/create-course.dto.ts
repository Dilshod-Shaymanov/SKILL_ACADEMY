import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'JavaScript asoslari',
    description: 'Kurs nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Bu kurs JavaScript asoslarini o'rgatadi",
    description: 'Kurs tavsifi',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '100',
    description: 'Kurs narxi',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: '30 soat',
    description: 'Kurs davomiyligi',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    example: 'https://t.me/joinchat/ABCDE12345',
    description: 'Telegram havolasi',
  })
  @IsString()
  @IsNotEmpty()
  telegram_link: string;

  @ApiProperty({
    example: "Boshlang'ich",
    description: 'Kurs darajasi',
  })
  @IsString()
  @IsNotEmpty()
  level: string;
}
