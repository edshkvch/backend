import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { HashPasswordService } from '@libs/auth';

import { JwtConfigService } from '../../config';
import { UserModule } from '../user';

import { AuthController } from './presentation';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService }), UserModule],
  providers: [HashPasswordService],
})
export class AuthModule {}
