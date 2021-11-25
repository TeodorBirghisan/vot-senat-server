import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SecurityService } from '../security/security.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

//TODO move logic in a LoginService/AuthService
@Controller('/auth')
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
  ) {}

  @Post('/login')
  async login(
    //TODO create DTO for request body
    @Body('email') email: string,
    @Body('password') password: string,
    //TODO create DTO for response
  ): Promise<{
    message?: string;
    status?: number;
    token?: string;
  }> {
    const user: User | null = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new HttpException(
        "You don't have an account with this email",
        HttpStatus.NOT_FOUND,
      );
    }

    //TODO add bcrypt verification
    if (user.password !== password) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      token: await this.securityService.createToken(user),
    };
  }

  @Post('/signup')
  async signup(
    //TODO create DTO for request body
    @Body('email') email: string,
    @Body('password') password: string,
    //TODO create DTO for response
  ): Promise<{
    message?: string;
    status?: number;
    token?: string;
  }> {
    //TODO bcrypt the password so that it is not visible in the database
    await this.userService.saveOne(email, password);
    return {
      message: 'User created successfully',
    };
  }
}
