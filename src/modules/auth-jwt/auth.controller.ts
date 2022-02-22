import { UserDto, toUserDto } from './../user/user.dto';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthJwtService } from './auth-jwt.service';

@Controller('/auth-jwt')
export class AuthJWTController {
  constructor(private readonly authService: AuthJwtService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const result = await this.authService.register(createUserDto);
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req: any) {
    return toUserDto(req.user);
  }
}
