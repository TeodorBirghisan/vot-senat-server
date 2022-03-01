import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
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

  @Get('/result/:topicId')
  getResult(
    @Param(
      'topicId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    topicId: number,
  ): Promise<Record<string, string>> {
    return this.voteService.getResult(topicId);
  }
}
