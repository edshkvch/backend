import { ApplicationConfig } from './application';
import { GoogleOauthConfig } from './google-oauth';
import { PostgresConfig } from './postgres';
import { SecurityConfig } from './security';

export interface Config extends ApplicationConfig, GoogleOauthConfig, PostgresConfig, SecurityConfig {}
