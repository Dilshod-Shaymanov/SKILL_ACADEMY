import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 100,
    description: "To'lov miqdori",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: '2024-11-01',
    description: "To'lov sanasi",
  })
  @IsDateString()
  @IsNotEmpty()
  payment_date: string;

  @ApiProperty({
    example: 'credit_card',
    description: "To'lov usuli",
  })
  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @ApiProperty({
    example: '12 months',
    description: "To'lov shartlari",
  })
  @IsString()
  @IsNotEmpty()
  terms: string;
}
