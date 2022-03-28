import { toUserDto } from './../user/user.dto';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthJwtService } from './auth-jwt.service';
import { InvitationGuard } from '../invitation/invitation.guard';
import { InvitationService } from '../invitation/invitation.service';

@Controller('/auth-jwt')
export class AuthJWTController {
  constructor(
    private readonly authService: AuthJwtService,
    private readonly invitationService: InvitationService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const result = await this.authService.register(createUserDto);
    return result;
  }

  @Post('invitation/register')
  @UseGuards(InvitationGuard)
  async registerWithInvitation(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    const invitationToken: string = request.headers['authorization'];

    const result = await this.authService.register(createUserDto);

    //TBD instead of deletion, the invitation should be invalidated, instead of deleted
    const deleteionSuccessfull =
      await this.invitationService.deleteInvitationByToken(invitationToken);

    if (!deleteionSuccessfull) {
      //TODO: rollback user creation
      throw new HttpException(
        'Error deleting deleting the invitation',
        HttpStatus.CONFLICT,
      );
    }

    return {
      message: 'User created successfully',
    };
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
