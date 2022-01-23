import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async findOneById(topicId: number): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });
  }

  async findAllTopicsByMeeting(meetingId: number): Promise<Topic[]> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);
    if (!meeting) {
      throw new HttpException('No meeting found', HttpStatus.BAD_REQUEST);
    }
    return this.topicRepository.find({
      where: {
        meeting: meeting,
      },
      relations: ['meeting'],
    });
  }

  async saveTopicToMeeting(meetingId: number, content: string): Promise<Topic> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);

    const topic: Topic = this.topicRepository.create({
      content,
      isActive: false,
      meeting: meeting,
    });

    return await this.topicRepository.save(topic);
  }

  async getAllTopicsInMeeting(meetingId: number): Promise<Topic[]> {
    return await this.findAllTopicsByMeeting(meetingId);
  }
}
