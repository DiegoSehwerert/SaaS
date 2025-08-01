import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, type LoginDto, type LoginResponse } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { UserResponse } from '../users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any): Promise<UserResponse> {
    return this.authService.getProfile(req.user.id);
  }
}
