import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { GoogleOauthService } from './application';
import { GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN } from './core/tokens';
import { GoogleOauthModuleAsyncOptions, GoogleOauthModuleOptions } from './core/types';

@Global()
@Module({
  controllers: [],
  exports: [GoogleOauthService],
  imports: [],
  providers: [GoogleOauthService],
})
export class GoogleOauthModule {
  public static register(options: GoogleOauthModuleOptions): DynamicModule {
    return {
      module: GoogleOauthModule,
      providers: [
        {
          provide: GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }

  public static registerAsync(options: GoogleOauthModuleAsyncOptions): DynamicModule {
    return {
      imports: options.imports || [],
      module: GoogleOauthModule,
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(options: GoogleOauthModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: GoogleOauthModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory) => optionsFactory.createGoogleOauthOptions(),
    };
  }
}
