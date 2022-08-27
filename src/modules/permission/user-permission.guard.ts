import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRolesEnum } from '../role/role.entity';
import { UserRoleService } from '../user-role/user-role.service';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRoleService: UserRoleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //TODO replace magic string with enum value/constant
    const guardRoles = this.reflector.get<UserRolesEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request, guardRoles);
  }

  /* Assumes the token is already verified and valid */
  async validateRequest(
    request: any,
    guardRoles: UserRolesEnum[],
  ): Promise<boolean> {
    if (!guardRoles) {
      return true;
    }

    return await this.userRoleService.checkPermission(request, guardRoles);
  }
}
