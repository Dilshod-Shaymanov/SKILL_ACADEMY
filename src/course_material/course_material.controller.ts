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
import { CourseMaterialService } from './course_material.service';
import { CreateCourseMaterialDto } from './dto/create-course_material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course_material.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseMaterial } from './models/course_material.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Kurs materiallari')
@Controller('course-material')
@Roles('TEACHER')
@UseGuards(RolesGuard)
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @ApiOperation({ summary: 'Yangi kurs materiali yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi kurs materiali yaratildi',
    type: CourseMaterial,
  })
  @Post()
  create(@Body() createCourseMaterialDto: CreateCourseMaterialDto) {
    return this.courseMaterialService.create(createCourseMaterialDto);
  }

  @ApiOperation({ summary: 'Barcha kurs materiallarini olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha kurs materiallari ro'yxati",
    type: [CourseMaterial],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.courseMaterialService.findAll();
  }

  @ApiOperation({ summary: "Kurs materialini ID bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Kurs materiali topildi',
    type: CourseMaterial,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMaterialService.findOne(+id);
  }

  @ApiOperation({ summary: "Kurs materialini ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Kurs materiali muvaffaqiyatli yangilandi',
    type: CourseMaterial,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseMaterialDto: UpdateCourseMaterialDto,
  ) {
    return this.courseMaterialService.update(+id, updateCourseMaterialDto);
  }

  @ApiOperation({ summary: "Kurs materialini ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kurs materiali muvaffaqiyatli o'chirildi",
    type: CourseMaterial,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMaterialService.remove(+id);
  }
}
