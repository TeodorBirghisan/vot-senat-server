import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/user.dto';
import { JwtPayload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.userService.saveOne(userDto);

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user: User = await this.userService.findOneByEmail(
      loginUserDto.email,
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(loginUserDto.password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this._createToken(user);

    return {
      user: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ id, email }: UserDto): any {
    const user: JwtPayload = { id, email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.expiresIn,
      accessToken,
    };
  }
}
