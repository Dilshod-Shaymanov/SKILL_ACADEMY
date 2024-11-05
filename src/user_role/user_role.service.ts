import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './models/user_role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleModel.create(createUserRoleDto);
  }

  findAll() {
    return this.userRoleModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userRoleModel.findByPk(+id, { include: { all: true } });
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const update = await this.userRoleModel.update(updateUserRoleDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.userRoleModel.destroy({ where: { id } });
  }
}
