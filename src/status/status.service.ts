import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  create(createStatusDto: CreateStatusDto) {
    return this.statusModel.create(createStatusDto);
  }

  findAll() {
    return this.statusModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.statusModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const update = await this.statusModel.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.statusModel.destroy({ where: { id } });
  }
}
