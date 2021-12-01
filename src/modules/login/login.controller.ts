import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Request
} from '@nestjs/common';
import { InvitationGuard } from '../invitation/invitation.guard';
import { InvitationService } from '../invitation/invitation.service';
import { SecurityService } from '../security/security.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

//TODO move logic in a LoginService/AuthService
@Controller('/auth')
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
    private readonly invitationService: InvitationService
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

  //TODO remove this once seeding is done
  //and leave only the invitation signup
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

  @Post('/invitation/signup')
  @UseGuards(InvitationGuard)
  async signupWithInvitation(
    @Req() request: Request,
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
    const invitationToken: string = request.headers["authorization"];

    const user:User = await this.userService.saveOne(email, password);

    if(!user) {
      throw new HttpException(
        'Could not create user',
        HttpStatus.CONFLICT,
      );
    }
    //TBD instead of deletion, the invitation should be invalidated, instead of deleted
    const deleteionSuccessfull = await this.invitationService.deleteInvitationByToken(invitationToken);

    if(!deleteionSuccessfull) {
      //TODO rollback user creation
      throw new HttpException(
        "Error deleting deleting the invitation",
        HttpStatus.CONFLICT,
      );
    }

    return {
      message: 'User created successfully',
    };
  }
}
