import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({
    example: '2023-10-01',
    description: 'Sertifikat berilgan sana',
  })
  @IsNotEmpty()
  @IsString()
  issue_date: string;

  @ApiProperty({
    example: 'CERT123456',
    description: 'Sertifikatning noyob kodi',
  })
  @IsNotEmpty()
  @IsString()
  certificate_code: string;

  @ApiProperty({
    example: 'true',
    description: 'Kursni tugatganlik holati',
  })
  @IsNotEmpty()
  @IsString()
  completed: string;

  @ApiProperty({
    example: 'A',
    description: 'Bahosi',
  })
  @IsNotEmpty()
  @IsString()
  grade: string;

  @ApiProperty({
    example: 'Shahrizoda Karimova',
    description: "O'qituvchining ismi",
  })
  @IsNotEmpty()
  @IsString()
  teacher_name: string;

  @ApiProperty({
    example: '40 soat',
    description: 'Davomiyligi',
  })
  @IsNotEmpty()
  @IsString()
  duration: string;
}
