import { PostgresConfig } from './postgres-config.type';

export const postgresConfiguration = (): PostgresConfig => {
  return {
    postgres: {
      url: process.env.APPLICATION_POSTGRES_URL,
    },
  };
};
