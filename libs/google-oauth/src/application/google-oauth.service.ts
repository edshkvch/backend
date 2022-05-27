import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN } from '../core/tokens';
import { GoogleOauthModuleOptions } from '../core/types';

import { GetUserResult } from './google-oauth.service-type';

@Injectable()
export class GoogleOauthService {
  private readonly _accessType = 'offline';
  private readonly _authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  private readonly _grantType = 'authorization_code';
  private readonly _prompt = 'consent';
  private readonly _responseType = 'code';
  private readonly _tokensUrl = 'https://oauth2.googleapis.com/token';
  private readonly _userInfoUrl = 'https://www.googleapis.com/auth/userinfo';

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly scope: string[];

  constructor(
    @Inject(GOOGLE_OAUTH_MODULE_OPTIONS_TOKEN)
    private readonly options: GoogleOauthModuleOptions,
  ) {
    const { clientId, clientSecret, redirectUrl, scope } = options;

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUrl = redirectUrl;
    this.scope = scope;
  }

  public getAuthUrl() {
    const options = {
      access_type: this._accessType,
      client_id: this.clientId,
      prompt: this._prompt,
      redirect_uri: this.redirectUrl,
      response_type: this._responseType,
      scope: this.scope.map((scope) => `${this._userInfoUrl}.${scope}`).join(' '),
    };

    const authUrl = new URL(this._authUrl);

    for (const urlSearchParamKey of Object.keys(options)) {
      authUrl.searchParams.append(urlSearchParamKey, options[urlSearchParamKey]);
    }

    return authUrl.toString();
  }

  public async getUser(queryCode: string): Promise<GetUserResult> {
    const options = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: queryCode,
      grant_type: this._grantType,
      redirect_uri: this.redirectUrl,
    };

    const tokensUrl = new URL(this._tokensUrl);

    for (const urlSearchParamKey of Object.keys(options)) {
      tokensUrl.searchParams.append(urlSearchParamKey, options[urlSearchParamKey]);
    }

    const tokensUrlData = await fetch(tokensUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    });

    const { access_token, id_token } = await tokensUrlData.json();

    const user = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });

    const { email, family_name, given_name, hd, id, locale, name, picture, verified_email } = await user.json();

    return {
      avatarUrl: picture,
      email,
      firstName: family_name,
      hd,
      id,
      lastName: given_name,
      locale,
      name,
      verifiedEmail: verified_email,
    };
  }
}
