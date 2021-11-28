import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoginModule } from './modules/login/login.module';
import { UserPermissionModule } from './modules/permission/user-permission.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserRoleService } from './modules/user-role/user-role.service';

@Module({
  imports: [DatabaseModule, AuthModule, LoginModule, UserRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private userRoleService: UserRoleService,
  ) {
    // userRoleService.seed();
  }
}
