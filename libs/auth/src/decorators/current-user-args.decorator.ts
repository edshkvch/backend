import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserArgs = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.currentUser;
});
