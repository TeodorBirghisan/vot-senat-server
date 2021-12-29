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
  ) {}

  async saveVote(
    topicId: number,
    userId: number,
    voteValue: string,
  ): Promise<Vote> {
    const vote: Vote = await this.findOneByIds(topicId, userId);

    if (vote) {
      throw new HttpException('You already voted!', HttpStatus.BAD_REQUEST);
    }

    const topic: Topic = await this.topicService.findOneById(topicId);
    const user: User = await this.userService.findOneById(userId);

    const now = new Date();

    const newVote: Vote = this.voteRepository.create({
      date: now,
      value: voteValue,
      topic: topic,
      user: user,
    });

    return this.voteRepository.save(newVote);
  }

  async findOneByIds(topicId: number, userId: number): Promise<Vote> {
    return this.voteRepository.findOne({
      where: {
        topic: topicId,
        user: userId,
      },
    });
  }
}
