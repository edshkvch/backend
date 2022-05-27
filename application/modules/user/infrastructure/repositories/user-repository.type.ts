export interface AddRoleToUserParameters {
  roleId: string;
  userId: string;
}

export interface GetUserRolesByUserIdParameters {
  userId: string;
}

export interface UpdateUserByIdParameters {
  email?: string;
  fullName?: string;
  userId: string;
  userName?: string;
}
