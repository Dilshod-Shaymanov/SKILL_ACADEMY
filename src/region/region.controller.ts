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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './models/region.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Viloyatlar')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Yangi viloyat yaratish' })
  @ApiResponse({
    status: 201,
    description: "Yangi viloyat qo'shildi",
    type: Region,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Barcha viloyatlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha viloyatlar ro'yxati",
    type: [Region],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Bitta viloyatni olish' })
  @ApiResponse({
    status: 200,
    description: "Viloyat idsi bo'yicha topildi",
    type: Region,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Bitta viloyatni Id si orqali yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Viloyat muvaffaqiyatli yangilandi!',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: "Bitta viloyatni Id si orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Viloyat muvaffaqiyatli o'chirildi!",
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
