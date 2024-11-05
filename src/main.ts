import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { CustomValidationPipe } from './pipe/validation.pipe';
import { AllExceptionsFilter } from './logger/ali-exception';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    app.useGlobalFilters(new AllExceptionsFilter(new Logger()));

    // app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(new CustomValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Skill Academy project')
      .setDescription('Skill Academy project REST API')
      .setVersion('1.0')
      .addTag(
        'NESTJS, validation, swagger, guard, mailer, sequelize, pg, cookie',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
