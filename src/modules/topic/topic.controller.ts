import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@Controller('/topics')
export class TopicsController {
  constructor(private topicService: TopicService) {}

  @Post('/saveToMeeting/:id')
  addTopicToMeeting(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body('content') content: string,
  ): Promise<Topic> {
    return this.topicService.saveTopicToMeeting(id, content);
  }
}
