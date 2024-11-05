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
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lesson } from './models/lesson.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Darslar')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ summary: 'Yangi dars yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi dars yaratildi',
    type: Lesson,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'Barcha darslarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha darslar ro'yxati",
    type: [Lesson],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @ApiOperation({ summary: "Darsni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Dars topildi',
    type: Lesson,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @ApiOperation({ summary: "Darsni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Dars muvaffaqiyatli yangilandi',
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @ApiOperation({ summary: "Darsni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Dars muvaffaqiyatli o'chirildi",
    type: Lesson,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
