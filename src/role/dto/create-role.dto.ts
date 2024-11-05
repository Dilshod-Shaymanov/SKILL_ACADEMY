import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Administrator',
    description: 'Rol nomini kiriting',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
