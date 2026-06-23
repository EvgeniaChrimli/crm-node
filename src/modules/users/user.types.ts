export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type CreateUserBody = {
  name: string;
  email: string;
};

export type CreateUserDto = {
  email: string;
  name: string;
};

export type UpdateUserDto = {
  email?: string;
  name?: string;
};
