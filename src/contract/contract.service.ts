import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract)
    private readonly contractModel: typeof Contract,
  ) {}

  create(createContractDto: CreateContractDto) {
    return this.contractModel.create(createContractDto);
  }

  findAll() {
    return this.contractModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.contractModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const update = await this.contractModel.update(updateContractDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.contractModel.destroy({ where: { id } });
  }
}
