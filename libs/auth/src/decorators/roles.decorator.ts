import { SetMetadata } from '@nestjs/common';

import { REFLECTOR_KEY_ROLES } from '../constants';
import { Role } from '../core';

export const Roles = (...roles: Role[]) => {
  return SetMetadata(REFLECTOR_KEY_ROLES, roles);
};
