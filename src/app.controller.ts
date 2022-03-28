import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './modules/auth/auth.guard';
import { UserPermissionGuard } from './modules/permission/user-permission.guard';

@Controller()
@UseGuards(AuthGuard, UserPermissionGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
}
