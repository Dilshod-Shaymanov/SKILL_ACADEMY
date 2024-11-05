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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './models/review.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Sharhlar')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Yangi sharh yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi sharh yaratildi',
    type: Review,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Barcha sharhlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha sharhlar ro'yxati",
    type: [Review],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({ summary: "Sharhni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Sharh topildi',
    type: Review,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @ApiOperation({ summary: "Sharhni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Sharh muvaffaqiyatli yangilandi',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @ApiOperation({ summary: "Sharhni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Sharh muvaffaqiyatli o'chirildi",
    type: Review,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
