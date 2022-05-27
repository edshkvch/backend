import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Config } from '../configuration.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { url } = this.configService.get<Config['postgres']>('postgres');

    return {
      autoLoadEntities: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      type: 'postgres',
      url,
    };
  }
}
