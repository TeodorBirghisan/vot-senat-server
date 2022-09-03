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

@Controller('/user-role')
@UseGuards(AuthGuard(), UserPermissionGuard)
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get('/available/users')
  async getAllUsersWithSubRoles(@Req() req: any) {
    return this.userRoleService.getAllUsersWithSubRoles(req);
  }

  @Get('/users/permissions')
  async getAllUsersPermissions(@Req() req: any) {
    return this.userRoleService.getAllUsersPermissions(req);
  }

  @Put('/grant')
  @UserPermission([UserRolesEnum.CAN_GRANT_ROLES])
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
}
