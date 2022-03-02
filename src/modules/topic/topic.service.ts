import { MEETING_STATUS_FINISHED } from './../../core/constants/index';
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
    const topic: Topic = await this.topicRepository.findOne({
      where: {
        id: topicId,
      },
    });

    if (!topic) {
      throw new HttpException(
        'This topic does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return topic;
  }

  async findAllTopicsByMeeting(meetingId: number): Promise<Topic[]> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);

    return this.topicRepository.find({
      where: {
        meeting: meeting,
      },
      relations: ['meeting'],
    });
  }

  async findOneByMeeting(meetingId: number, topicId: number): Promise<Topic> {
    const topic: Topic = await this.topicRepository.findOne({
      where: {
        id: topicId,
        meeting: meetingId,
      },
    });

    if (!topic) {
      throw new HttpException(
        'The topic does not exist in this meeting',
        HttpStatus.BAD_REQUEST,
      );
    }

    return topic;
  }

  async saveTopicToMeeting(meetingId: number, content: string): Promise<Topic> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);

    if (meeting.status == MEETING_STATUS_FINISHED) {
      throw new HttpException(
        'You cannot add topics to a finished meeting',
        HttpStatus.BAD_REQUEST,
      );
    }

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

  async deleteTopicInMeeting(
    meetingId: number,
    topicId: number,
  ): Promise<number> {
    const topicToDelete: Topic = await this.findOneByMeeting(
      meetingId,
      topicId,
    );

    const deletedTopic: Topic = await this.topicRepository.remove(
      topicToDelete,
    );

    if (!deletedTopic) {
      throw new HttpException('Cannot delete topic!', HttpStatus.BAD_REQUEST);
    }

    return topicId;
  }
}
