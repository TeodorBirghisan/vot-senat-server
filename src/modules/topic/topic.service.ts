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
      relations: ['votes', 'votes.user'],
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

  async getAllTopicsInMeeting(meetingId: number): Promise<any> {
    const topics: Topic[] = await this.findAllTopicsByMeeting(meetingId);

    const voteResults = topics.map((topic) => {
      const votes = topic.votes.reduce(
        (results, vote) => {
          results[vote.value] = results[vote.value] + 1;
          return results;
        },
        {
          YES: 0,
          ABTAIN: 0,
          NO: 0,
        },
      );

      const usersWhoVotes = topic.votes.map((vote) => {
        return vote.user.id;
      });

      const isActive = topic.isActive;
      const content = topic.content;
      const topicId = topic.id;

      return {
        topicId,
        content,
        isActive,
        votes,
        usersWhoVotes,
      };
    });

    return voteResults;
  }

  async activateTopicInMeeting(topicId: number): Promise<any> {
    const topicToActivate: Topic = await this.findOneById(topicId);
    topicToActivate.isActive = true;
    const updatedTopic: Topic = await this.topicRepository.save(
      topicToActivate,
    );

    if (!updatedTopic) {
      throw new HttpException(
        'Could not activate the topic',
        HttpStatus.BAD_REQUEST,
      );
    }

    return updatedTopic;
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
