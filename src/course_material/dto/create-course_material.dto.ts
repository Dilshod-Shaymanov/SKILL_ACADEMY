import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseMaterialDto {
  @ApiProperty({
    example: 'JavaScript Darslari',
    description: 'Material nomi',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'JavaScript asoslari va amaliy darslar',
    description: 'Material tavsifi',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2024-11-01',
    description: 'Yuklash sanasi',
  })
  @IsString()
  @IsNotEmpty()
  upload_date: string;

  @ApiProperty({
    example: '2 soat 30 daqiqa',
    description: 'Material davomiyligi',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    example: '500MB',
    description: 'Material hajmi',
  })
  @IsString()
  @IsNotEmpty()
  size: string;
}
