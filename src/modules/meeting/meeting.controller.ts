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
import { UserPermission } from '../permission/user-permission.decorator';
import { UserPermissionGuard } from '../permission/user-permission.guard';
import { UserRolesEnum } from '../role/role.entity';
import { MeetingDTO } from './meeting.dto';

import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Controller('/meetings')
@UseGuards(AuthGuard(), UserPermissionGuard)
export class MeetingsController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  getMeetings(): Promise<Meeting[]> {
    return this.meetingService.getAll();
  }

  @Post()
  @UserPermission([UserRolesEnum.CAN_CREATE_MEETINGS])
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
