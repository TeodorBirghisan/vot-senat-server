import { ParticipationEntryService } from './participation-entry.service';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParticipationEntry } from './partitcipation-entry.entity';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/participation')
@UseGuards(AuthGuard())
export class ParticipationEntryController {
  constructor(private participationEntryService: ParticipationEntryService) {}

  @Post('/joinMeeting/:meetingId')
  joinMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Req() req: any,
  ): Promise<ParticipationEntry> {
    return this.participationEntryService.joinMeeting(meetingId, req);
  }

  @Put('/exitMeeting/:meetingId')
  exitMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
    @Req() req: any,
  ): Promise<ParticipationEntry> {
    return this.participationEntryService.exitMeeting(meetingId, req);
  }

  @Get('/allUsers/:meetingId')
  getAllUsersInMeeting(
    @Param(
      'meetingId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    meetingId: number,
  ): Promise<User[]> {
    return this.participationEntryService.getAllUsersInMeeting(meetingId);
  }
}
