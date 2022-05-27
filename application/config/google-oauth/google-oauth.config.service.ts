import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleOauthModuleOptions, GoogleOauthModuleOptionsFactory } from '@libs/google-oauth';

import { Config } from '../configuration.type';

@Injectable()
export class GoogleOauthConfigService implements GoogleOauthModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createGoogleOauthOptions(): GoogleOauthModuleOptions {
    const { clientId, clientSecret, redirectUrl } = this.configService.get<Config['googleOauth']>('googleOauth');

    return {
      clientId,
      clientSecret,
      redirectUrl,
      scope: ['profile', 'email'],
    };
  }
}
