import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityToken } from '../security/security-token.entity';
import { SecurityModule } from '../security/security.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { RolesController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, SecurityToken]),
    UserModule,
    SecurityModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [RoleService],
  controllers: [RolesController],
  exports: [RoleService],
})
export class RoleModule {}
