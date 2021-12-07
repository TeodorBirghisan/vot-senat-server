import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { Meeting } from '../meeting/meeting.entity';
import { TopicService } from './topic.service';
import { TopicsController } from './topic.controller';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { MeetingModule } from '../meeting/meeting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, Meeting, User]),
    UserModule,
    MeetingModule,
  ],
  providers: [TopicService],
  controllers: [TopicsController],
  exports: [TopicService],
})
export class TopicModule {}
