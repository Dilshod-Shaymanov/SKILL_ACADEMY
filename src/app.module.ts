import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { LanguageModule } from './language/language.module';
import { StatusModule } from './status/status.module';
import { CategoryModule } from './category/category.module';
import { LessonModule } from './lesson/lesson.module';
import { CourseMaterialModule } from './course_material/course_material.module';
import { CourseModule } from './course/course.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { ContractModule } from './contract/contract.module';
import { ReviewModule } from './review/review.module';
import { CertificateModule } from './certificate/certificate.module';
import { DiscountModule } from './discount/discount.module';
import { NotificationModule } from './notification/notification.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './user_role/user_role.module';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';
import { Language } from './language/models/language.model';
import { Status } from './status/models/status.model';
import { Category } from './category/models/category.model';
import { Lesson } from './lesson/models/lesson.model';
import { CourseMaterial } from './course_material/models/course_material.model';
import { Course } from './course/models/course.model';
import { Admin } from './admin/models/admin.model';
import { Payment } from './payment/models/payment.model';
import { Contract } from './contract/models/contract.model';
import { Review } from './review/models/review.model';
import { Discount } from './discount/models/discount.model';
import { Notification } from './notification/models/notification.model';
import { Role } from './role/models/role.model';
import { User } from './users/models/user.model';
import { UserRole } from './user_role/models/user_role.model';
import { Certificate } from './certificate/model/certificate.model';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        District,
        Region,
        Language,
        Status,
        Category,
        Lesson,
        CourseMaterial,
        Course,
        Admin,
        Payment,
        Contract,
        Review,
        Certificate,
        Discount,
        Notification,
        Role,
        User,
        UserRole,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DistrictModule,
    RegionModule,
    LanguageModule,
    StatusModule,
    CategoryModule,
    LessonModule,
    CourseMaterialModule,
    CourseModule,
    AdminModule,
    PaymentModule,
    ContractModule,
    ReviewModule,
    CertificateModule,
    DiscountModule,
    NotificationModule,
    RoleModule,
    UsersModule,
    AuthModule,
    UserRoleModule,
    MailModule,
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
