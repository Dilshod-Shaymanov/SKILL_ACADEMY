import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';

@Module({
  imports: [SequelizeModule.forFeature([Contract])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
