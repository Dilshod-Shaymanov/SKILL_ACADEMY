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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { AdminGuard } from '../guards/admin.guard';
import { CreatorGuard } from '../guards/creator.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';

@ApiTags('Adminlar')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi admin yaratildi',
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar ro'yxati",
    type: [Admin],
  })
  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Adminni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Admin topildi',
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli yangilandi',
  })
  @UseGuards(AdminSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o'chirildi",
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
