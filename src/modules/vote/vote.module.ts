import { User } from './../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Topic } from '../topic/topic.entity';
import { UserModule } from '../user/user.module';
import { TopicModule } from '../topic/topic.module';
import { MeetingModule } from '../meeting/meeting.module';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Vote } from './vote.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, User, Topic]),
    UserModule,
    TopicModule,
    MeetingModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [VoteService],
  controllers: [VoteController],
  exports: [VoteService],
})
export class VoteModule {}
