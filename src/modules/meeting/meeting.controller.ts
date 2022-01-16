import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MeetingDTO } from './meeting.dto';

import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Controller('/meetings')
export class MeetingsController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  getMeetings(): Promise<Meeting[]> {
    return this.meetingService.getAll();
  }

  //TODO: Organizer = user making the req. For now userId will replace that
  @Post('/:userId')
  createMeeting(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body() meeting: MeetingDTO,
  ) {
    if (!meeting.description) {
      meeting.description = 'No description provided';
    }

    return this.meetingService.saveOne(userId, meeting);
  }

  @Post('/join/:meetingId/:userId')
  joinMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ) {
    return this.meetingService.joinMeeting(meetingId, userId);
  }
}
