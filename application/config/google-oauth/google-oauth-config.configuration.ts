import { GoogleOauthConfig } from './google-oauth-config.type';

export const googleOauthConfiguration = (): GoogleOauthConfig => {
  return {
    googleOauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: process.env.GOOGLE_REDIRECT_URL,
    },
  };
};
