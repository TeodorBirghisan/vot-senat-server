import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/user.dto';
import { JwtPayload } from './jwt.strategy';
import { jwtConstants } from './constants';

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user: User = await this.userService.findOneByEmail(email);
  //   if (user && user.password == pass) {
  //     const { password, email } = user;
  //     return email;
  //   }
  //   return null;
  // }

  // async login(email: string, pass: string) {
  //   const user: User | null = await this.userService.findOneByEmail(email);

  //   if (!user) {
  //     throw new HttpException(
  //       "You don't have an account with this email",
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   if (user.password !== pass) {
  //     throw new HttpException(
  //       'Email or password is incorrect',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   const payload = { email: user.email, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async register(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.userService.saveOne(userDto);

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user: User = await this.userService.findOneByEmail(
      loginUserDto.email,
    );

    //TODO: validate password

    if (!user) {
      throw new HttpException(
        "You don't have an account with this email",
        HttpStatus.NOT_FOUND,
      );
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
      expiresIn: '60s',
      accessToken,
    };
  }
}
