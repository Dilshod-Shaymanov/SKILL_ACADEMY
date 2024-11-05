import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Foydalanuvchi roli')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOperation({ summary: 'Yangi Use-role yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi Use-role muvaffaqiyatli yaratildi',
  })
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @ApiOperation({ summary: 'Barcha Use-role larni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha Use-role lar ro'yxati",
  })
  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @ApiOperation({ summary: "Muayyan Use-roleni id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Use-role id si bo'yicha topildi",
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @ApiOperation({ summary: "Use-roleni id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Use-role id si bo'yicha yangilandi",
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @ApiOperation({ summary: "Use-roleni id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Use-role id si bo'yicha o'chirildi",
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
