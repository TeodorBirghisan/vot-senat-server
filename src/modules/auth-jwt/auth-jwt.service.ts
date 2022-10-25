import { ChangePasswordUserDto } from './../user/user.dto';
import { UserRoleService } from './../user-role/user-role.service';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/user.dto';
import { JwtPayload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';
import { Invitation } from '../invitation/invitation.entity';
import { InvitationService } from '../invitation/invitation.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly jwtService: JwtService,
    private readonly invitationService: InvitationService,
    private mailService: MailService,
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

    const userPermissions = await this.userRoleService.getPermissionsForUser(
      user.id,
    );

    return {
      userId: user.id,
      permissions: userPermissions,
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

  async forgotPassoword(req: any): Promise<any> {
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const forgotPasswordToken: Invitation =
      await this.invitationService.createInvitation();
    await this.mailService.sendUserConfirmation(
      req.user.email,
      forgotPasswordToken,
    );

    return {
      forgotPasswordToken: forgotPasswordToken.invitationToken,
    };
  }

  async changePassword(
    req: any,
    changePasswordUserDto: ChangePasswordUserDto,
  ): Promise<UserDto> {
    const changePasswordToken: string = req.headers.passwordtoken;

    const newPassUser: UserDto = await this.userService.changePassword(
      req.user.id,
      changePasswordUserDto,
    );

    const deleteionSuccessfull =
      await this.invitationService.deleteInvitationByToken(changePasswordToken);

    if (!deleteionSuccessfull) {
      //TODO: rollback password reset
      throw new HttpException(
        'Error deleting deleting the invitation',
        HttpStatus.CONFLICT,
      );
    }

    return newPassUser;
  }

  private _createToken({ id, email }: UserDto): any {
    const user: JwtPayload = { id, email };
    const accessToken = this.jwtService.sign(user);
    return {
      //TODO: remove this when expiresIn is stable
      expiresIn: process.env.expiresIn,
      accessToken,
    };
  }
}
