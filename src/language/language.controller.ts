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
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Language } from './models/language.model';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Tillar')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'Yangi til yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi til yaratildi',
    type: Language,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @ApiOperation({ summary: 'Barcha tillarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha tillar ro'yxati",
    type: [Language],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @ApiOperation({ summary: "Tilni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Til topildi',
    type: Language,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @ApiOperation({ summary: "Tilni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Til muvaffaqiyatli yangilandi',
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: "Tilni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Til muvaffaqiyatli o'chirilidi",
    type: Language,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
