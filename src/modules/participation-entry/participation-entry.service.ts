import { MeetingService } from './../meeting/meeting.service';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationEntry } from './partitcipation-entry.entity';
import { User } from '../user/user.entity';
import { MEETING_STATUS_IN_PROGRESS } from 'src/core/constants';
import { Meeting } from '../meeting/meeting.entity';

@Injectable()
export class ParticipationEntryService {
  constructor(
    @InjectRepository(ParticipationEntry)
    private participationEntryRepository: Repository<ParticipationEntry>,
    private userService: UserService,
    private meetingService: MeetingService,
  ) {}

  async findOneByMeetingAndUser(
    meetingId: number,
    userId: number,
  ): Promise<ParticipationEntry> {
    return this.participationEntryRepository.findOne({
      where: {
        meeting: meetingId,
        user: userId,
      },
    });
  }

  async joinMeeting(
    meetingId: number,
    userId: number,
  ): Promise<ParticipationEntry> {
    const meetingToJoin: Meeting = await this.meetingService.findOneById(
      meetingId,
    );

    const userToJoin: User = await this.userService.findOneById(userId);

    const timeToJoin: Date = new Date();

    const meetingStartDate: Date = meetingToJoin.startDate;
    if (timeToJoin < meetingStartDate) {
      throw new HttpException(
        'Too early to join this meeting',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const alreadyJoined: ParticipationEntry =
        await this.findOneByMeetingAndUser(meetingId, userId);
      if (alreadyJoined) {
        throw new HttpException(
          'You already joined this meeting',
          HttpStatus.BAD_REQUEST,
        );
      }

      //TODO change status of meeting
      meetingToJoin.status = MEETING_STATUS_IN_PROGRESS;
      const participationEntry: ParticipationEntry =
        this.participationEntryRepository.create({
          joinTimestamp: timeToJoin,
          meeting: meetingToJoin,
          user: userToJoin,
          exitTimestamp: null,
        });
      return await this.participationEntryRepository.save(participationEntry);
    }
  }
}
