import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { SmsService } from '../sms/sms.service';
import { Otp } from '../otp/models/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { decode, encode } from 'punycode';
import * as uuid from 'uuid';
import { RoleService } from '../role/role.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AddRemoveRoleDto } from './dto/add-remove-role.dto';
import { Role } from '../role/models/role.model';
import { RegionService } from '../region/region.service';
import { CreateRegionDto } from '../region/dto/create-region.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Otp) private otpModel: typeof Otp,
    private readonly smsService: SmsService,
    private readonly roleService: RoleService,
    private readonly regionService: RegionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    const role = await this.roleService.findByRoleName(
      createUserDto.role_value,
    );
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    await newUser.$set('roles', [role.id]); // Bu yerda UserRoles ga o'tib o'sha yerdagi roleId ga va userId ga yangi id qo'shib qo'yadi
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      },
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException('User already activated');
    }

    const response = {
      message: 'User activated successfully!',
      user: updateUser[1][0].is_active,
    };
    return response;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // SMS
    const response = await this.smsService.sendSMS(phone_number, otp);

    if (response.status == 200) {
      throw new ServiceUnavailableException('OTP yuborishda xatolik!');
    }

    const message =
      `OTP code has been send to ****` +
      phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);

    await this.otpModel.destroy({ where: { phone_number } });

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      expiration_time,
      phone_number,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return { message, details: encodedData };
  }

  async veifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const deatails = JSON.parse(decodedData);
    if (deatails.phone_number !== phone_number) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: deatails.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException('Bunday otp mavjud emas');
    }
    if (resultOtp.verified) {
      throw new BadRequestException('Bu OTP avval tekshirilgan');
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException('Bu OTP avval vaqti tugagan');
    }
    if (resultOtp.otp !== otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.userModel.update(
      {
        is_active: true,
      },
      { where: { phone_number }, returning: true },
    );
    if (!user[1][0]) {
      throw new BadRequestException('Bunday foydalanuvchi yoq');
    }
    await this.otpModel.update(
      {
        verified: true,
      },
      { where: { id: deatails.otp_id } },
    );

    const responser = {
      message: "Siz owner bo'ldingiz",
      owner: user[1][0].is_active,
    };

    return responser;
  }

  async addRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.userModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.roleService.findByRoleName(
      addRemoveRoleDto.role_value,
    );
    if (role && user) {
      await user.$add('roles', role.id);
      const updatedUser = await this.userModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } },
      );
      return updatedUser;
    }
    throw new NotFoundException('Foydalanuvchi yoki role topilmadi');
  }

  async removeRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.userModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.roleService.findByRoleName(
      addRemoveRoleDto.role_value,
    );
    if (role && user) {
      await user.$remove('roles', role.id);
      const updatedUser = await this.userModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } },
      );
      return updatedUser;
    }
    throw new NotFoundException('Foydalanuvchi yoki role topilmadi');
  }
}
