import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { PhoneUserDto } from './dto/phone-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SelfGuard } from '../guards/self.guard';
import { AddRemoveRoleDto } from './dto/add-remove-role.dto';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi foydalanuvchi yaratildi',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilar ro'yxati",
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchini Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi topildi',
    type: User,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli yangilandi',
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli o'chirildi",
    type: User,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Userni faollashtirish' })
  @ApiResponse({
    status: 200,
    description: 'Userni faollashtirish',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  }

  @HttpCode(HttpStatus.OK)
  @Post('newotp')
  async newOtp(
    @Body() phoneUserDto: PhoneUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.veifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: "Foydalanuvchiga role qo'shish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchiga yangi role qo'shildi",
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post('add-role')
  @HttpCode(200)
  async addRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.addRole(addRemoveRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini roleni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi role o'chirildi",
    type: Number,
  })
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  @Post('delete-role')
  async removeRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.removeRole(addRemoveRoleDto);
  }
}
