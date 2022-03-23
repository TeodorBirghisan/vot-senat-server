import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { UserPermissionGuard } from './user-permission.guard';

@Module({
  imports: [RoleModule, UserPermissionGuard],
  exports: [UserPermissionGuard],
})
export class UserPermissionModule {}
