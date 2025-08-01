export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
