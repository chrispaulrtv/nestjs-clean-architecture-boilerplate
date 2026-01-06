import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Clean Architecture API')
    .setDescription('Boilerplate profesional con NestJS, TypeORM y Clean Architecture')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  logger.log(`📑 Swagger Docs available at: http://localhost:${port}/docs`);
}
bootstrap();