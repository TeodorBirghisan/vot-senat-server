import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRolesEnum } from '../role/role.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRoleService: RoleService,
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

    if (!request.headers.authorization) {
      return false;
    }

    const token = request.headers.authorization.split(' ')[1];

    return await this.userRoleService.checkPermission(token, guardRoles);
  }
}
