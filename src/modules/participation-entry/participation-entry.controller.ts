import { ParticipationEntryService } from './participation-entry.service';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ParticipationEntry } from './partitcipation-entry.entity';
import { User } from '../user/user.entity';

@Controller('/participation')
export class ParticipationEntryController {
  constructor(private participationEntryService: ParticipationEntryService) {}

  @Post('/joinMeeting/:meetingId/:userId')
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
  ): Promise<ParticipationEntry> {
    return this.participationEntryService.joinMeeting(meetingId, userId);
  }

  @Put('/exitMeeting/:meetingId/:userId')
  exitMeeting(
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
  ): Promise<ParticipationEntry> {
    return this.participationEntryService.exitMeeting(meetingId, userId);
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
