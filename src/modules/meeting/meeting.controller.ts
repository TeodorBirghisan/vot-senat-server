import { Body, Controller, Get, Post } from '@nestjs/common';

import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Controller('/meetings')
export class MeetingsController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  getMeetings(): Promise<Meeting[]> {
    return this.meetingService.getAll();
  }

  @Post()
  createMeeting(@Body('title') title: string): Promise<Meeting> {
    return this.meetingService.saveOne(title, new Date(), 'TO_BE_DISSCUSSED');
  }
}
