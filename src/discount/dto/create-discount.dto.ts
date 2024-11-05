import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({
    example: 'DISCOUNT2024',
    description: 'Chegirma kodi',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Yangi yil chegirmasi',
    description: 'Chegirma tavsifi',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '15',
    description: 'Chegirma foizi',
  })
  @IsString()
  @IsNotEmpty()
  percent: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Chegirma boshlanish sanasi',
  })
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Chegirma tugash sanasi',
  })
  @IsString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    example: true,
    description: 'Chegirma holati (faol yoki faol emas)',
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
