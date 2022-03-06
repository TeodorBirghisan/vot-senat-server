import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MeetingDTO } from './meeting.dto';

import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Controller('/meetings')
@UseGuards(AuthGuard())
export class MeetingsController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  getMeetings(): Promise<Meeting[]> {
    return this.meetingService.getAll();
  }

  @Get('/finished')
  getFinishedMeetings(): Promise<Meeting[]> {
    return this.meetingService.getAllFinished();
  }

  @Post()
  createMeeting(
    @Body() meeting: MeetingDTO,
    @Req() req: any,
  ): Promise<Meeting> {
    return this.meetingService.saveOne(req, meeting);
  }

  @Delete('/:meetingId')
  deleteMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Req() req: any,
  ): Promise<number> {
    return this.meetingService.deleteOne(req, meetingId);
  }
}
