import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@Controller('/topics')
@UseGuards(AuthGuard())
export class TopicsController {
  constructor(private topicService: TopicService) {}

  @Post('/:meetingId')
  addTopicToMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Body('content') content: string,
  ): Promise<Topic> {
    return this.topicService.saveTopicToMeeting(meetingId, content);
  }

  @Get('/:meetingId')
  getAllTopicsInMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
  ): Promise<Topic[]> {
    return this.topicService.getAllTopicsInMeeting(meetingId);
  }

  @Delete('/:meetingId')
  deleteTopicInMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Body('topicId') topicId: number,
  ): Promise<Topic> {
    return this.topicService.deleteTopicInMeeting(meetingId, topicId);
  }
}
