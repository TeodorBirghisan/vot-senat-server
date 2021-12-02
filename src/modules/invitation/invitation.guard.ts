import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InvitationService } from './invitation.service';

@Injectable()
export class InvitationGuard implements CanActivate {
  constructor(private readonly invitationService: InvitationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    // Here authorization represents the invitationToken not any login token
    if (!request.headers.authorization) {
      return false;
    }

    const invitationToken: string | null = request.headers.authorization;

    if (!invitationToken) {
      return false;
    }

    const invitation = await this.invitationService.findByInvitationToken(
      invitationToken,
    );

    if (!invitation) {
      return false;
    }

    return true;
  }
}
