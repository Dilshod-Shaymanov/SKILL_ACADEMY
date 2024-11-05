import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    example: 'Pending',
    description: 'Status nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
