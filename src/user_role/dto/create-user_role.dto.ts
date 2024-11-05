import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({
    description: 'Role unikal identifikatori',
    example: 1,
  })
  @IsNumber()
  roleId: number;

  @ApiProperty({
    description: 'Foydalanuvchi unikal identifikatori',
    example: 2,
  })
  @IsNumber()
  userId: number;
}
