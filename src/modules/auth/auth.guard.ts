import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/modules/security/security.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly securityService: SecurityService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    if (!request.headers.authorization) {
      return false;
    }

    const token: string | null = request.headers.authorization.split(' ')?.[1];

    //TBD dont' allow multiple users to use the same token?
    if (!(await this.securityService.checkToken(token))) {
      return false;
    }

    return true;
  }
}
