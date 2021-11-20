import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';

@Module({
  providers: [UserService, ...userProvider],
  exports: [UserService],
})
export class UserModule {}
