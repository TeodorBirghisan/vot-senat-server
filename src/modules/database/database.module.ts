import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { Invitation } from '../invitation/invitation.entity';
import { SecurityToken } from '../security/security-token.entity';
import { UserRole } from '../user-role/user-role.entity';
import { User } from '../user/user.entity';
import { DATABASE_CONFIG } from './database.config';
import { Topic } from '../topic/topic.entity';
import { Vote } from '../vote/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(DATABASE_CONFIG as any),
      entities: [User, SecurityToken, UserRole, Meeting, Invitation, Topic],
      ssl: { rejectUnauthorized: false },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
