import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

@Controller('/vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/:topicId/:userId')
  vote(
    @Param(
      'topicId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    topicId: number,
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body('voteValue') voteValue: string,
  ): Promise<Vote> {
    return this.voteService.saveVote(topicId, userId, voteValue);
  }

  @Get('/:userId')
  getVote(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body('topicId') topicId: number,
  ): Promise<Vote | Vote[]> {
    return this.voteService.getVote(topicId, userId);
  }
}
