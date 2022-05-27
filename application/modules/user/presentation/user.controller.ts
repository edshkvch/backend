import { Get, Controller, UseGuards } from '@nestjs/common';

import { AuthGuard, CurrentUser, CurrentUserArgs } from '@libs/auth';

import { UserRepository } from '../infrastructure';

@UseGuards(AuthGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/me')
  public async getCurrentUser(@CurrentUserArgs() { userId }: CurrentUser) {
    const data = await this.userRepository.findOne({ _id: userId });

    return { data };
  }
}
