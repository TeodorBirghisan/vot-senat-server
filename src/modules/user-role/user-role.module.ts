import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';
import { RoleModule } from '../role/role.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserRoleController } from './user-role.controller';
import { UserRole } from './user-role.entity';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole, User, Role]),
    UserModule,
    RoleModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [UserRoleService],
  controllers: [UserRoleController],
  exports: [UserRoleService],
})
export class UserRoleModule {}
