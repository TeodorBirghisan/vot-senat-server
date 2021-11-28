import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityToken } from '../security/security-token.entity';
import { UserRole } from '../user-role/user-role.entity';
import { User } from '../user/user.entity';
import { DATABASE_CONFIG } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(DATABASE_CONFIG as any),
      entities: [User, SecurityToken, UserRole],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
