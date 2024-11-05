import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { SmsModule } from '../sms/sms.module';
import { Otp } from '../otp/models/otp.model';
import { OtpModule } from '../otp/otp.module';
import { RoleModule } from '../role/role.module';
import { RegionModule } from '../region/region.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    SmsModule,
    OtpModule,
    RoleModule,
    RegionModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
