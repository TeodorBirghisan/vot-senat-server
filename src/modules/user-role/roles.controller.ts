import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserRolesEnum } from './user-role.entity';
import { UserRoleService } from './user-role.service';

@Controller('/roles')
@UseGuards(AuthGuard())
export class RolesController {
  constructor(
    private userRoleService: UserRoleService,
    private userService: UserService,
  ) {}

  //TBD Put request (because it updates a property)?
  //TBD endpoint structure?
  //TBD does this need multiple controllers for users and other entities with roles?
  @Put('/user/grant')
  async grantUserRoles(
    @Body(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body('roles') roles: UserRolesEnum[],
  ) {
    //TODO check if roles are inline with the ones in the enum
    //TODO add correct error responses
    const user: User = await this.userService.findOneById(userId);

    if (!user) {
      throw new HttpException(
        "You don't have an account with this id",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRoleService.grantRolesToUser(user, roles);
  }
}
