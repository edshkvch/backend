import { applicationConfiguration } from './application';
import { googleOauthConfiguration } from './google-oauth';
import { postgresConfiguration } from './postgres';
import { securityConfiguration } from './security';

export const configuration = [applicationConfiguration, googleOauthConfiguration, postgresConfiguration, securityConfiguration];
