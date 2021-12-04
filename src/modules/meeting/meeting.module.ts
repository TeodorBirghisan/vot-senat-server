import { Meeting } from './meeting.entity';
import { Module } from '@nestjs/common';
import { MeetingsController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, User])],
  providers: [MeetingService, UserService],
  controllers: [MeetingsController],
  exports: [MeetingService],
})
export class MeetingModule {}
