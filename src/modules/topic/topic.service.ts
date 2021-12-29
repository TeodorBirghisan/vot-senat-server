import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { MeetingService } from '../meeting/meeting.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private meetingService: MeetingService,
  ) {}

  async saveTopicToMeeting(meetingId: number, content: string): Promise<Topic> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);

    const topic: Topic = this.topicRepository.create({
      content,
      isActive: false,
      meeting: meeting,
    });

    return await this.topicRepository.save(topic);
  }

  async findOneById(topicId: number): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });
  }
}
