import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  UserResponse,
} from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard) // Primero JWT, luego Roles
  @Roles('ADMIN') // Solo tú puedes ver todos los usuarios de la plataforma
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) // Primero JWT, luego Roles
  @Roles('ADMIN', 'MANAGER', 'USER') // Cualquier usuario autenticado puede ver perfiles
  async findById(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard) // Primero JWT, luego Roles
  @Roles('ADMIN') // Solo tú puedes buscar por email
  async findByEmail(
    @Param('email') email: string,
  ): Promise<UserResponse | null> {
    return this.usersService.findByEmail(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Solo tú puedes crear usuarios manualmente (ej: primeros managers)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Post('register-professional')
  @HttpCode(HttpStatus.CREATED)
  async registerProfessional(
    @Body() createUserDto: Omit<CreateUserDto, 'role'>,
  ): Promise<UserResponse> {
    // Los profesionales se registran como MANAGER
    return this.usersService.create({ ...createUserDto, role: 'MANAGER' });
  }

  @Post('register-client')
  @HttpCode(HttpStatus.CREATED)
  async registerClient(
    @Body() createUserDto: Omit<CreateUserDto, 'role'>,
  ): Promise<UserResponse> {
    // Los clientes se registran como USER
    return this.usersService.create({ ...createUserDto, role: 'USER' });
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN') // Solo tú puedes editar otros usuarios (moderación de la plataforma)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'USER') // Cualquiera puede cambiar su propia contraseña
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.usersService.changePassword(id, changePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN') // Solo tú puedes eliminar usuarios (moderación)
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateUser(
    @Body() credentials: { email: string; password: string },
  ): Promise<UserResponse | null> {
    return this.usersService.validateUser(
      credentials.email,
      credentials.password,
    );
  }

  // Endpoint para que los managers vean solo sus clientes
  @Get('manager/:managerId/clients')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async getClientsByManager(
    @Param('managerId') managerId: string,
  ): Promise<UserResponse[]> {
    // TODO: Implementar en el servicio cuando tengas la relación manager-client
    return this.usersService.findClientsByManager(managerId);
  }

  // Endpoint para listar solo profesionales (managers)
  @Get('professionals')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getProfessionals(): Promise<UserResponse[]> {
    return this.usersService.findByRole('MANAGER');
  }

  // Endpoint para listar solo clientes
  @Get('clients')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getClients(): Promise<UserResponse[]> {
    return this.usersService.findByRole('USER');
  }
}
