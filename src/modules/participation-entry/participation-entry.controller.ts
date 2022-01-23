import { ParticipationEntryService } from './participation-entry.service';
import {
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

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
  ) {
    return this.participationEntryService.joinMeeting(meetingId, userId);
  }
}
