import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Certificate } from './model/certificate.model';

@Module({
  imports: [SequelizeModule.forFeature([Certificate])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
