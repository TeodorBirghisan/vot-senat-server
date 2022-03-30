import { MeetingService } from './../meeting/meeting.service';
import { Meeting } from './../meeting/meeting.entity';
import {
  VOTE_VALUE_ABTAIN,
  VOTE_VALUE_YES,
  VOTE_VALUE_NO,
} from './../../core/constants/index';
import { UserService } from './../user/user.service';
import { TopicService } from './../topic/topic.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Topic } from '../topic/topic.entity';
import { User } from '../user/user.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private topicService: TopicService,
    private userService: UserService,
    private meetingService: MeetingService,
  ) {}

  async findOneByIds(topicId: number, userId: number): Promise<Vote> {
    return this.voteRepository.findOne({
      where: {
        topic: topicId,
        user: userId,
      },
    });
  }

  async findAllByUser(userId: number): Promise<Vote[]> {
    return this.voteRepository.find({
      where: { user: userId },
    });
  }

  async findAllByTopic(topicId: number): Promise<Vote[]> {
    return this.voteRepository.find({
      where: { topic: topicId },
      relations: ['user', 'topic'],
    });
  }

  async saveVote(topicId: number, req: any, voteValue: string): Promise<Vote> {
    const vote: Vote = await this.findOneByIds(topicId, req.user.id);

    if (vote) {
      throw new HttpException('You already voted!', HttpStatus.BAD_REQUEST);
    }

    const topic: Topic = await this.topicService.findOneById(topicId);
    const user: User = await this.userService.findOneById(req.user.id);

    const now = new Date();

    const newVote: Vote = this.voteRepository.create({
      date: now,
      value: voteValue,
      topic: topic,
      user: user,
    });

    return this.voteRepository.save(newVote);
  }

  async getVote(topicId: number, userId: number): Promise<Vote | Vote[]> {
    if (!topicId) {
      const votes: Vote[] = await this.findAllByUser(userId);
      return votes;
    } else {
      const vote: Vote = await this.findOneByIds(topicId, userId);

      if (!vote) {
        throw new HttpException(
          'No vote found for this topic',
          HttpStatus.BAD_REQUEST,
        );
      }

      return vote;
    }
  }

  //TODO: create type vote Values to check the validity of vote
  async getVoteCount(topicId: number): Promise<Map<string, number>> {
    const validVotes: string[] = [
      VOTE_VALUE_YES,
      VOTE_VALUE_NO,
      VOTE_VALUE_ABTAIN,
    ];

    const voteCount: Map<string, number> = new Map<string, number>();

    for (const vote in validVotes) {
      const count: [Vote[], number] = await this.voteRepository.findAndCount({
        where: { topic: topicId, value: validVotes[vote] },
      });
      const key = validVotes[vote];
      voteCount[key] = count[1];
    }

    return voteCount;
  }

  async getResult(topicId: number): Promise<Record<string, string>> {
    await this.topicService.findOneById(topicId);

    const voteCount: Map<string, number> = await this.getVoteCount(topicId);

    let maxVoteCount = 0;
    let majorityVote = '';

    for (const [voteValue, count] of Object.entries(voteCount)) {
      if (count > maxVoteCount) {
        maxVoteCount = count;
        majorityVote = voteValue;
      } else if (count == maxVoteCount) {
        majorityVote = 'EQUAL';
      }
    }

    const result: Record<string, string> = { vote: majorityVote };

    return result;
  }

  async getDetailedVotes(meetingId: number) {
    const topics: Topic[] = await this.topicService.getAllTopicsInMeeting(
      meetingId,
    );

    const topicIds: number[] = topics.map((topic) => topic.id);

    const detailedUserVotes = [];

    for (const topicId of topicIds) {
      const votes = await this.findAllByTopic(topicId);
      votes.map((vote) =>
        detailedUserVotes.push(
          `User ${vote.user.email} voted ${vote.value} in topic ${vote.topic.content}`,
        ),
      );
    }

    return detailedUserVotes;
  }
}
