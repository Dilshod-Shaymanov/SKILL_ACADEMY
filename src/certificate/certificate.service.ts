import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Certificate } from './model/certificate.model';

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel(Certificate) private certificateModel: typeof Certificate,
  ) {}

  create(createCertificateDto: CreateCertificateDto) {
    return this.certificateModel.create(createCertificateDto);
  }

  findAll() {
    return this.certificateModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.certificateModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    const update = await this.certificateModel.update(updateCertificateDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.certificateModel.destroy({ where: { id } });
  }
}
