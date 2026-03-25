import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Security & Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(morgan('dev'));

  const clientUrl = configService.get<string>(
    'CLIENT_URL',
    'http://localhost:3000',
  );
  const adminUrl = configService.get<string>(
    'ADMIN_URL',
    'http://localhost:5173',
  );

  app.enableCors({
    origin: [clientUrl, adminUrl],
    credentials: true,
  });

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Safar API')
    .setDescription('Phase 1 Foundation API definition')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
