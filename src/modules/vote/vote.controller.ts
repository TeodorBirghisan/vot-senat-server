import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

@Controller('/vote')
@UseGuards(AuthGuard())
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/:topicId')
  vote(
    @Param('topicId') topicId: number,
    @Body('voteValue') voteValue: string,
    @Req() req: any,
  ): Promise<Vote> {
    return this.voteService.saveVote(topicId, req, voteValue);
  }
}
