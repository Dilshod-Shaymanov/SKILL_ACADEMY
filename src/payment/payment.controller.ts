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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags("To'lovlar")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi to'lov muvaffaqiyatli yaratildi",
    type: Payment,
  })
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha to'lovlar ro'yxati",
    type: [Payment],
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha to'lovni topish" })
  @ApiResponse({
    status: 200,
    description: "To'lov topildi",
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: "ID bo'yicha to'lovni yangilash" })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli yangilandi",
  })
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "ID bo'yicha to'lovni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli o'chirildi",
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
