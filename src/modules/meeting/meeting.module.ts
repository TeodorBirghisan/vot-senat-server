import { Meeting } from './meeting.entity';
import { Module } from '@nestjs/common';
import { MeetingsController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ParticipationEntry } from '../participation-entry/partitcipation-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, User, ParticipationEntry]),
    UserModule,
  ],
  providers: [MeetingService],
  controllers: [MeetingsController],
  exports: [MeetingService],
})
export class MeetingModule {}
