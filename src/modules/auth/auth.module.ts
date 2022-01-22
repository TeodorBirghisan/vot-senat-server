import { Module } from '@nestjs/common';
import { SecurityModule } from 'src/modules/security/security.module';
import { InvitationModule } from '../invitation/invitation.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthGuard],
  imports: [SecurityModule, UserModule, InvitationModule],
  controllers: [AuthController],
  exports: [AuthGuard, SecurityModule],
})
export class AuthModule {}
