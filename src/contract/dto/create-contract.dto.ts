import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Shartnoma boshlanish sanasi',
  })
  @IsNotEmpty({ message: 'Boshlanish sanasi majburiy' })
  @IsDateString({}, { message: "Boshlanish sanasi noto'g'ri formatda" })
  start_date: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Shartnoma tugash sanasi',
  })
  @IsNotEmpty({ message: 'Tugash sanasi majburiy' })
  @IsDateString({}, { message: "Tugash sanasi noto'g'ri formatda" })
  end_date: string;

  @ApiProperty({
    example: '10000',
    description: 'Shartnoma miqdori',
  })
  @IsNotEmpty({ message: 'Miqdor majburiy' })
  @IsNumberString({}, { message: "Miqdor faqat raqam bo'lishi kerak" })
  amount: string;

  @ApiProperty({
    example: 'AB1234567',
    description: 'Pasport ma"lumoti',
  })
  @IsNotEmpty({ message: 'Pasport ma"lumoti majburiy' })
  passport: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Shartnoma tuzilgan sana',
  })
  @IsNotEmpty({ message: 'Tuzilgan sana majburiy' })
  @IsDateString({}, { message: "Tuzilgan sana noto'g'ri formatda" })
  contract_date: string;
}
