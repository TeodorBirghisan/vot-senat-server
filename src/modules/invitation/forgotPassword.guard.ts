import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InvitationService } from './invitation.service';

@Injectable()
export class ForgotPasswordGuard implements CanActivate {
  constructor(private readonly invitationService: InvitationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    if (!request.headers.passwordtoken) {
      return false;
    }

    const forgotPasswordToken: string | null = request.headers.passwordtoken;

    if (!forgotPasswordToken) {
      return false;
    }

    const forgotToken = await this.invitationService.findByInvitationToken(
      forgotPasswordToken,
    );

    if (!forgotToken) {
      return false;
    }

    return true;
  }
}
