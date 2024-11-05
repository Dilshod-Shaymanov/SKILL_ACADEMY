import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    description: 'Tumanni nomi',
    example: 'Chilonzor',
  })
  @IsString({ message: "Tuman nomi string bo'lishi kerak!" })
  @IsNotEmpty({ message: 'Tuman kiritmadingiz' })
  name: string;
}
