import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesEnum } from '../role/role.entity';
import { UserRoleService } from './user-role.service';

@Controller('/user-role')
@UseGuards(AuthGuard())
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get('/available/users')
  async getAllUsersWithSubRoles(@Req() req: any) {
    return this.userRoleService.getAllUsersWithSubRoles(req);
  }

  @Put('/grant')
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
