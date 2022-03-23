import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { UserPermissionModule } from './modules/permission/user-permission.module';
import { TopicModule } from './modules/topic/topic.module';
import { UserRoleModule } from './modules/role/role.module';
import { UserRoleService } from './modules/role/role.service';
import { VoteModule } from './modules/vote/vote.module';
import { MailModule } from './modules/mail/mail.module';
import { ParticipationEntryModule } from './modules/participation-entry/participation-entry.module';
import { AuthJwtModule } from './modules/auth-jwt/auth-jwt.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserRoleModule,
    MeetingModule,
    InvitationModule,
    TopicModule,
    VoteModule,
    MailModule,
    ParticipationEntryModule,
    AuthJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private userRoleService: UserRoleService,
  ) {
    //CREATE OWNER IN SEED
    // userRoleService.seed();
  }
}
