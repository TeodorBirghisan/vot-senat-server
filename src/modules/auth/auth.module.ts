import { Module } from '@nestjs/common';
import { SecurityModule } from 'src/modules/security/security.module';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthGuard],
  imports: [SecurityModule],
  exports: [AuthGuard, SecurityModule],
})
export class AuthModule {}
