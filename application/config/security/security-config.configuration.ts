import { SecurityConfig } from './security-config.type';

export const securityConfiguration = (): SecurityConfig => {
  return {
    security: {
      jwtSecret: process.env.APPLICATION_JWT_SECRET,
    },
  };
};
