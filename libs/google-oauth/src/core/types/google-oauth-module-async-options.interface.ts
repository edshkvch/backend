import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { GoogleOauthModuleOptionsFactory } from './google-oauth-module-options-factory.interface';
import { GoogleOauthModuleOptions } from './google-oauth-module-options.interface';

export interface GoogleOauthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<GoogleOauthModuleOptionsFactory>;
  useExisting?: Type<GoogleOauthModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<GoogleOauthModuleOptions> | GoogleOauthModuleOptions;
}
