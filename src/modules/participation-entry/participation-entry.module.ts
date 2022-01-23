import { ParticipationEntryService } from './participation-entry.service';
import { ParticipationEntryController } from './participation-entry.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ParticipationEntry } from './partitcipation-entry.entity';
import { MeetingModule } from '../meeting/meeting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipationEntry, Meeting, User]),
    UserModule,
    MeetingModule,
  ],
  providers: [ParticipationEntryService],
  controllers: [ParticipationEntryController],
  exports: [ParticipationEntryService],
})
export class ParticipationEntryModule {}
