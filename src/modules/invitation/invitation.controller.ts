import { MailService } from '../mail/mail.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserPermission } from '../permission/user-permission.decorator';
import { UserRolesEnum } from '../user-role/user-role.entity';
import { Invitation } from './invitation.entity';
import { InvitationService } from './invitation.service';

//TODO move logic in a LoginService/AuthService
@Controller('/invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private mailService: MailService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UserPermission([UserRolesEnum.CAN_CREATE_INVITATION])
  async createInvitation(@Body('email') email: string) {
    const invitation: Invitation =
      await this.invitationService.createInvitation();
    await this.mailService.sendUserConfirmation(email, invitation);
    return {
      invitationToken: invitation.invitationToken,
    };
  }
}
