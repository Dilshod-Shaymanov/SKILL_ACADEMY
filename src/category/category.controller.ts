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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Kategoriyalar')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Yangi kategoriya yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi kategoriya muvaffaqiyatli yaratildi.',
    type: Category,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha kategoriyalar ro'yxati.",
    type: [Category],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Kategoriya ID orqali olish' })
  @ApiResponse({
    status: 200,
    description: 'Berilgan IDga ega kategoriya.',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Kategoriya topilmadi.',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Kategoriya yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Kategoriya muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Yangilanish uchun kategoriya topilmadi.',
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Kategoriya o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun kategoriya topilmadi.",
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
