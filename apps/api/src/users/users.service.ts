import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  UserResponse,
} from './users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly SALT_ROUNDS = 12; // Más seguro que 10

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserResponse[]> {
    this.logger.log('Fetching all users');

    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<UserResponse> {
    this.logger.log(`Fetching user with ID: ${id}`);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    this.logger.log(`Fetching user with email: ${email}`);

    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    this.logger.log(`Creating user with email: ${data.email}`);

    // Validar email único
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Validar contraseña
    if (data.password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role || 'USER',
          password: {
            create: {
              hash: hashedPassword,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(`User created successfully with ID: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    this.logger.log(`Updating user with ID: ${id}`);

    // Verificar que el usuario existe
    await this.findById(id);

    // Si se actualiza el email, validar que no exista
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(`User updated successfully with ID: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw new BadRequestException('Failed to update user');
    }
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    this.logger.log(`Changing password for user with ID: ${id}`);

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { password: true },
    });

    if (!user || !user.password) {
      throw new NotFoundException('User not found');
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password.hash,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Validar nueva contraseña
    if (data.newPassword.length < 8) {
      throw new BadRequestException(
        'New password must be at least 8 characters long',
      );
    }

    const hashedNewPassword = await bcrypt.hash(
      data.newPassword,
      this.SALT_ROUNDS,
    );

    try {
      await this.prisma.userPassword.update({
        where: { userId: id },
        data: { hash: hashedNewPassword },
      });

      this.logger.log(`Password changed successfully for user with ID: ${id}`);
    } catch (error) {
      this.logger.error('Error changing password', error);
      throw new BadRequestException('Failed to change password');
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);

    // Verificar que el usuario existe
    await this.findById(id);

    try {
      await this.prisma.user.delete({
        where: { id },
      });

      this.logger.log(`User deleted successfully with ID: ${id}`);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw new BadRequestException('Failed to delete user');
    }
  }

  // Método para autenticación (útil para login)
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    this.logger.log(`Validating user with email: ${email}`);

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password.hash);

    if (!isPasswordValid) {
      return null;
    }

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Buscar usuarios por rol
  async findByRole(
    role: 'ADMIN' | 'MANAGER' | 'USER',
  ): Promise<UserResponse[]> {
    this.logger.log(`Fetching users with role: ${role}`);

    return this.prisma.user.findMany({
      where: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Para cuando implementes la relación manager-client
  async findClientsByManager(managerId: string): Promise<UserResponse[]> {
    this.logger.log(`Fetching clients for manager: ${managerId}`);

    // TODO: Cuando tengas la tabla de relaciones manager-client
    // Por ahora devuelvo una implementación básica
    return this.prisma.user.findMany({
      where: {
        role: 'USER',
        // TODO: Agregar condición para manager específico cuando tengas la relación
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
