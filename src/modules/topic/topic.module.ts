import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { Meeting } from '../meeting/meeting.entity';
import { TopicService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Meeting])],
  providers: [TopicService],
  controllers: [],
  exports: [TopicService],
})
export class TopicModule {}
