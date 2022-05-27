import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { REFLECTOR_KEY_ROLES } from '../constants';
import { Role } from '../core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const { currentUser } = request;

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    const contextHandler = context.getHandler();

    const guardRoles = this.reflector.get<Role[]>(REFLECTOR_KEY_ROLES, contextHandler);

    if (!guardRoles) {
      return true;
    }

    const canActivate = !guardRoles.some((guardRole) => !currentUser.roles.includes(guardRole));

    if (!canActivate) {
      throw new ForbiddenException();
    }

    return true;
  }
}
