import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from '@libs/auth';
import { GoogleOauthModule } from '@libs/google-oauth';

import { configuration, GoogleOauthConfigService, JwtConfigService, TypeOrmConfigService, validate } from './config';
import { AuthModule } from './modules/auth';
import { EmployeeModule } from './modules/employee';
import { ProjectModule } from './modules/project';
import { ProjectClientModule } from './modules/project-client';
import { ProjectTypeaModule } from './modules/project-type';
import { UserModule } from './modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, validate }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    GoogleOauthModule.registerAsync({ useClass: GoogleOauthConfigService }),
    AuthModule,
    EmployeeModule,
    ProjectClientModule,
    ProjectModule,
    ProjectTypeaModule,
    UserModule,
  ],
})
export class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api');
  }
}
