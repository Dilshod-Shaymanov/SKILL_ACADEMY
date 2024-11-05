import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    example: 'Dars nomi',
    description: 'Dars nomini kiriting',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Dars mazmuni',
    description: 'Dars mazmunini kiriting',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '1',
    description: 'Darsning tartib raqami',
  })
  @IsString()
  @IsNotEmpty()
  order: string;
}
