import { ParticipationEntryService } from './participation-entry.service';
import {
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ParticipationEntry } from './partitcipation-entry.entity';

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
}
