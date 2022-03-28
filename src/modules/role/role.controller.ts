import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { RoleService } from './role.service';

@Controller('/roles')
@UseGuards(AuthGuard())
export class RolesController {
  constructor(
    private userRoleService: RoleService,
    private userService: UserService,
  ) {}
}
