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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from './models/course.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Kurslar')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi kurs yaratildi',
    type: Course,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Barcha kurslarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha kurslar ro'yxati",
    type: [Course],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: "Kursni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Kurs topildi',
    type: Course,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @ApiOperation({ summary: "Kursni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Kurs muvaffaqiyatli yangilandi',
    type: Course,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @ApiOperation({ summary: "Kursni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kurs muvaffaqiyatli o'chirildi",
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
