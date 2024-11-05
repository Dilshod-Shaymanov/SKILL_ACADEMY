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
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Certificate } from 'crypto';
import { Roles } from '../decorator/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Sertifikatlar')
@Controller('certificate')
@Roles('TEACHER')
@UseGuards(RolesGuard)
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @ApiOperation({ summary: 'Yangi sertifikat yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi sertifikat yaratildi',
    type: Certificate,
  })
  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @ApiOperation({ summary: 'Barcha sertifikatlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha sertifikatlar ro'yxati",
    type: [Certificate],
  })
  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @ApiOperation({ summary: "Sertifikatni Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Sertifikat topildi',
    type: Certificate,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

  @ApiOperation({ summary: "Sertifikatni Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Sertifikat muvaffaqiyatli yangilandi',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificateService.update(+id, updateCertificateDto);
  }

  @ApiOperation({ summary: "Sertifikatni Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Sertifikat muvaffaqiyatli o'chirildi",
    type: Certificate,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(+id);
  }
}
