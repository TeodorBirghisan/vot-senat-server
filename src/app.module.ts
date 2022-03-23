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
import { RoleModule } from './modules/role/role.module';
import { RoleService } from './modules/role/role.service';
import { VoteModule } from './modules/vote/vote.module';
import { MailModule } from './modules/mail/mail.module';
import { ParticipationEntryModule } from './modules/participation-entry/participation-entry.module';
import { AuthJwtModule } from './modules/auth-jwt/auth-jwt.module';
import { UserRoleModule } from './modules/user-role/user-role.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RoleModule,
    MeetingModule,
    InvitationModule,
    TopicModule,
    VoteModule,
    MailModule,
    ParticipationEntryModule,
    AuthJwtModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private userRoleService: RoleService,
  ) {
    //CREATE OWNER IN SEED
    // userRoleService.seed();
  }
}
