import { User } from './../user/user.entity';
import { Meeting } from './../meeting/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Topic } from '../topic/topic.entity';
import { UserModule } from '../user/user.module';
import { TopicModule } from '../topic/topic.module';
import { MeetingModule } from '../meeting/meeting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, User, Topic]),
    UserModule,
    TopicModule,
    MeetingModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class VoteModule {}
