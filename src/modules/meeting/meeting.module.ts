import { Meeting } from './meeting.entity';
import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
