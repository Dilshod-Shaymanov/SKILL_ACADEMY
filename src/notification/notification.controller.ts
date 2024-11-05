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
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notification } from './models/notification.model';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Xabarnomalar')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Yangi xabarnoma yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi xabarnoma yaratildi',
    type: Notification,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @ApiOperation({ summary: 'Barcha xabarnomalarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha xabarnomalar ro'yxati",
    type: [Notification],
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @ApiOperation({ summary: "Xabarnomani ID si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Xabarnoma topildi',
    type: Notification,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @ApiOperation({ summary: "Xabarnomani ID si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Xabarnoma muvaffaqiyatli yangilandi',
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @ApiOperation({ summary: "Xabarnomani ID si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Xabarnoma muvaffaqiyatli o'chirildi",
    type: Notification,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
