import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserPermission } from '../permission/user-permission.decorator';
import { UserRolesEnum } from '../user-role/user-role.entity';
import { Invitation } from './invitation.entity';
import { InvitationService } from './invitation.service';

//TODO move logic in a LoginService/AuthService
@Controller('/invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UserPermission([UserRolesEnum.CAN_CREATE_INVITATION])
  async createInvitation() {
    const invitation: Invitation =
      await this.invitationService.createInvitation();
    //TODO make endpoint require an email address and send an email to the targeted email

    return {
      invitationToken: invitation.invitationToken,
    };
  }
}
