import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../role/models/role.model';
import { User } from '../../users/models/user.model';

interface IUserRoleCreationAttr {
  roleId: number;
  userId: number;
}

@Table({ tableName: 'user_role', timestamps: false })
export class UserRole extends Model<UserRole, IUserRoleCreationAttr> {
  @ApiProperty({
    description: 'Role unikal identifikatori',
    example: 1,
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  roles: Role;

  @ApiProperty({
    description: 'Foydalanuvchi unikal identifikatori',
    example: 2,
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
