import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './modules/auth/auth.guard';
import { UserPermission } from './modules/permission/user-permission.decorator';
import { UserPermissionGuard } from './modules/permission/user-permission.guard';
import { UserRolesEnum } from './modules/user-role/user-role.entity';

@Controller()
@UseGuards(AuthGuard, UserPermissionGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/x')
  @UserPermission([UserRolesEnum.CAN_VIEW_X])
  getX(): string {
    return '<h1>Tou can view X</h1>';
  }

  @Get('/y')
  @UserPermission([UserRolesEnum.CAN_VIEW_Y])
  getY(): string {
    return '<h1>Tou can view Y</h1>';
  }

  @Get('/z')
  @UserPermission([UserRolesEnum.CAN_VIEW_Z])
  getZ(): string {
    return '<h1>Tou can view Z</h1>';
  }

  @Get('/xy')
  @UserPermission([UserRolesEnum.CAN_VIEW_X, UserRolesEnum.CAN_VIEW_Y])
  getXY(): string {
    return '<h1>Tou can view X and Y at the same time</h1>';
  }
}
