import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';

@Module({
  imports: [UserModule, SecurityModule],
  controllers: [LoginController],
})
export class LoginModule {}
