import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Rol')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Yangi rol yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi rol yaratildi',
    type: Role,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Barcha rollarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha rollar ro'yxati",
    type: [Role],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "Rolni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Rol topildi',
    type: Role,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: "Rolni Name si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Rol topildi',
    type: Role,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/name/:name')
  findByRoleName(@Param('name') name: string) {
    return this.roleService.findByRoleName(name);
  }

  @ApiOperation({ summary: "Rolni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Rol muvaffaqiyatli yangilandi',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Rolni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Rol muvaffaqiyatli o'chirildi",
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
