import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private rolemodel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.rolemodel.findOne({
      where: { name: createRoleDto.name },
    });
    if (role) {
      throw new InternalServerErrorException('Bundan role mavjud');
    }
    return this.rolemodel.create(createRoleDto);
  }

  findAll() {
    return this.rolemodel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.rolemodel.findByPk(+id, { include: { all: true } });
  }

  findByRoleName(name: string) {
    return this.rolemodel.findOne({ where: { name: name.toUpperCase() } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const update = await this.rolemodel.update(updateRoleDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.rolemodel.destroy({ where: { id } });
  }
}
