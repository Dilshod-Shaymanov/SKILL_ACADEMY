import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification) private notificationModel: typeof Notification,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  async findAll() {
    return this.notificationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.notificationModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const update = await this.notificationModel.update(updateNotificationDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  remove(id: number) {
    return this.notificationModel.destroy({ where: { id } });
  }
}
