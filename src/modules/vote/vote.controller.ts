import { Body, Controller, Param, Post } from '@nestjs/common';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

@Controller('/vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/:topicId/:userId')
  vote(
    @Param('topicId') topicId: number,
    @Param('userId') userId: number,
    @Body('voteValue') voteValue: string,
  ): Promise<Vote> {
    return this.voteService.saveVote(topicId, userId, voteValue);
  }
}
