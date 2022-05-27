import { IsNumber, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  APPLICATION_JWT_SECRET: string;

  @IsNumber()
  APPLICATION_PORT: number;

  @IsString()
  APPLICATION_POSTGRES_URL: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_REDIRECT_URL: string;
}
