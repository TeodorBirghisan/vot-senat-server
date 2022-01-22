
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ParticipationEntry } from './partitcipation-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationEntry, Meeting, User]), UserModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ParticipationEntryModule {}