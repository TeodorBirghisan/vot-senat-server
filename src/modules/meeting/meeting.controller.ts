import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  @Post('/createOne/:userId')
  createMeeting(
    @Param('userId') userId: number,
    @Body('title') title: string,
  ): Promise<Meeting> {
    return this.meetingService.saveOne(
      title,
      new Date(),
      'TO_BE_DISSCUSSED',
      userId,
    );
  }
}
