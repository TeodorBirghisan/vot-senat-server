import { Module } from '@nestjs/common';
import { InvitationModule } from '../invitation/invitation.module';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';

@Module({
  imports: [UserModule, SecurityModule, InvitationModule],
  controllers: [LoginController],
})
export class LoginModule {}
