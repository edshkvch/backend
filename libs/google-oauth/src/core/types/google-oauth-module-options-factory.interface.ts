import { GoogleOauthModuleOptions } from './google-oauth-module-options.interface';

export interface GoogleOauthModuleOptionsFactory {
  createGoogleOauthOptions(): Promise<GoogleOauthModuleOptions> | GoogleOauthModuleOptions;
}
