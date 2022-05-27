import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application.module';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const { port } = configService.get<Config['application']>('application');

  await app.listen(port);

  Logger.log(`Application is running on ${await app.getUrl()}`, 'bootstrap');
}

bootstrap();
