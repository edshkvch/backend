import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { CurrentUser } from '@libs/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  public async use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    const { authorization } = headers;

    if (!authorization) {
      request.currentUser = null;

      return next();
    }

    const [, token] = authorization.split(' ');

    try {
      const { roles, userId }: CurrentUser = await this.jwtService.verifyAsync(token);

      request.currentUser = {
        roles,
        userId,
      };
    } catch {
      request.currentUser = null;
    } finally {
      return next();
    }
  }
}
