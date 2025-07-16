import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config';
import { ConfigToken } from './constant/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // env
  const environment = app.get(ConfigService).get<Environment>(ConfigToken);
  app.useGlobalPipes(new ValidationPipe());
  // swagger setup
  const options = new DocumentBuilder()
    .setTitle('eKart API')
    .setDescription('API documentation for eKart application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refresh-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(environment?.PORT ?? 3001);
}
bootstrap();
