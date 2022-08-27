import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { RoleService } from './role.service';

@Controller('/roles')
@UseGuards(AuthGuard())
export class RolesController {
  constructor(
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  //TODO: Change mechanic to seed or only admin can use this endpoint
  @Post('/seed')
  seedUserRoles() {
    return this.roleService.seed();
  }
}
