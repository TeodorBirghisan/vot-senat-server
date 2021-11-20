import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_PROVIDER } from './user.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    UserService,
    ...USER_PROVIDER
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
