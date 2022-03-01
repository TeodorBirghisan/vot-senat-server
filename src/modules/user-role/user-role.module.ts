import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityToken } from '../security/security-token.entity';
import { SecurityModule } from '../security/security.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { RolesController } from './roles.controller';
import { UserRole } from './user-role.entity';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole, User, SecurityToken]),
    UserModule,
    SecurityModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [UserRoleService],
  controllers: [RolesController],
  exports: [UserRoleService],
})
export class UserRoleModule {}
