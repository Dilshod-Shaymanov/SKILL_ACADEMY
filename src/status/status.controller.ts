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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Statuslar')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Status muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({
    status: 400,
    description: 'Yaratishda xato.',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Barcha statuslar ro'yxati.",
    type: [CreateStatusDto],
  })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.statusService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Status muvaffaqiyatli topildi.',
    type: CreateStatusDto,
  })
  @ApiResponse({ status: 404, description: 'Status topilmadi.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Status muvaffaqiyatli yangilandi.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Yangilanish uchun status topilmadi.',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: "Status muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun status topilmadi.",
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
