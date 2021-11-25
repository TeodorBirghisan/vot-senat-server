import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityToken } from './security-token.entity';
import { SecurityService } from './security.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityToken])],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
