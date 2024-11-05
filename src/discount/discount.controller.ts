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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './models/discount.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Chegirmalar')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({ summary: 'Yangi chegirma yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi chegirma yaratildi',
    type: Discount,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Barcha chegirmalarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha chegirmalar ro'yxati",
    type: [Discount],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @ApiOperation({ summary: "Chegirmani Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Chegirma topildi',
    type: Discount,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @ApiOperation({ summary: "Chegirmani Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Chegirma muvaffaqiyatli yangilandi',
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @ApiOperation({ summary: "Chegirmani Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Chegirma muvaffaqiyatli o'chirildi",
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
