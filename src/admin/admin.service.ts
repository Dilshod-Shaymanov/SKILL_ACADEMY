import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create(createAdminDto);
  }

  findAdminByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({ where: { email } });
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const update = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  async remove(id: number) {
    return this.adminModel.destroy({ where: { id } });
  }
}
