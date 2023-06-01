import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPermission } from '../permission/user-permission.decorator';
import { UserPermissionGuard } from '../permission/user-permission.guard';
import { UserRolesEnum } from '../role/role.entity';
import { UserRoleService } from './user-role.service';

@Controller('/user-permissions')
@UseGuards(AuthGuard(), UserPermissionGuard)
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get()
  @UserPermission(
    [UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT] || [
        UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
      ] || [UserRolesEnum.CAN_GRANT_PERMISSIONS_VICEPRESIDENT],
  )
  async getAllUsersPermissions(@Req() req: any) {
    return this.userRoleService.getAllUsersPermissions(req);
  }

  @Put('/grant')
  @UserPermission(
    [UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT] || [
        UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
      ] || [UserRolesEnum.CAN_GRANT_PERMISSIONS_VICEPRESIDENT],
  )
  async grantUserRole(
    @Body(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body('roles')
    roles: UserRolesEnum[],
  ) {
    return this.userRoleService.grantUserRoles(userId, roles);
  }

  @Put('/update/permissions')
  @UserPermission(
    [UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT] || [
        UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
      ] || [UserRolesEnum.CAN_GRANT_PERMISSIONS_VICEPRESIDENT],
  )
  async updateUserPermission(
    @Body(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body('permission')
    permission: string,
    @Body('isEnabled')
    isEnabled: boolean,
  ) {
    return this.userRoleService.updateUserPermission(
      userId,
      permission,
      isEnabled,
    );
  }
}
