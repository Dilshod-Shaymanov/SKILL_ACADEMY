import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/user.model';
import { UserRole } from '../../user_role/models/user_role.model';

interface ICreationRoleAttr {
  name: string;
}

@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role, ICreationRoleAttr> {
  @ApiProperty({
    example: 1,
    description: 'Rol ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Administrator',
    description: 'Rol nomi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
