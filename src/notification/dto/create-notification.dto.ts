import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: "Yangi dars e'lon qilindi",
    description: 'Xabarnomaning sarlavhasi',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Bugun yangi dars o'tkaziladi.",
    description: 'Xabarnomaning matni',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 'email',
    description: 'Xabarnoma yuborish usuli',
  })
  @IsString()
  @IsNotEmpty()
  send_method: string;

  @ApiProperty({
    example: '2024-11-01T10:00:00Z',
    description: 'Xabarnomaning yuborish vaqti',
  })
  @IsString()
  @IsNotEmpty()
  send_time: string;
}
