import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './models/language.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private languageModel: typeof Language) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  findAll() {
    return this.languageModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.languageModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const update = await this.languageModel.update(updateLanguageDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.languageModel.destroy({ where: { id } });
  }
}
