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
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contract } from './models/contract.model';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Shartnomalar')
@Controller('contract')
@UseGuards(AdminGuard)
@UseGuards(JwtAuthGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOperation({ summary: 'Yangi shartnoma yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi shartnoma yaratildi',
    type: Contract,
  })
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @ApiOperation({ summary: 'Barcha shartnomalarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha shartnomalar ro'yxati",
    type: [Contract],
  })
  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @ApiOperation({ summary: "Shartnomani Id si bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Shartnoma topildi',
    type: Contract,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @ApiOperation({ summary: "Shartnomani Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Shartnoma muvaffaqiyatli yangilandi',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @ApiOperation({ summary: "Shartnomani Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Shartnoma muvaffaqiyatli o'chirildi",
    type: Contract,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
