import { Role } from '../enums';

export interface CurrentUser {
  roles: Role[];
  userId: string;
}
