import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { Meeting } from '../meeting/meeting.entity';
import { TopicService } from './topic.service';
import { TopicsController } from './topic.controller';
import { MeetingService } from '../meeting/meeting.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Meeting, User])],
  providers: [TopicService, MeetingService, UserService],
  controllers: [TopicsController],
  exports: [TopicService],
})
export class TopicModule {}
