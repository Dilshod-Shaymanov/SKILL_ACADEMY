import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './models/user_role.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
