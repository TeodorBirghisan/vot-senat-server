import {
  MEETING_STATUS_FINISHED,
  MEETING_STATUS_TO_BE_DISSCUSSED,
} from './../../core/constants/index';
import { MeetingService } from './../meeting/meeting.service';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

  async countAllUsersInMeeting(meetingId: number): Promise<number> {
    const usersCount: number = await this.participationEntryRepository.count({
      where: { meeting: meetingId, exitTimestamp: IsNull() },
    });
    return usersCount;
  }

  async joinMeeting(meetingId: number, req: any): Promise<ParticipationEntry> {
    const meetingToJoin: Meeting = await this.meetingService.findOneById(
      meetingId,
    );

    const userToJoin: User = await this.userService.findOneById(req.user.id);

    const timeToJoin: Date = new Date();

    const meetingStartDate: Date = meetingToJoin.startDate;
    if (timeToJoin < meetingStartDate) {
      throw new HttpException(
        'Too early to join this meeting',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const alreadyJoined: ParticipationEntry =
        await this.findOneByMeetingAndUser(meetingId, req.user.id);
      if (alreadyJoined) {
        throw new HttpException(
          'You already joined this meeting',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.meetingService.udpateStatus(
        meetingId,
        MEETING_STATUS_IN_PROGRESS,
      );
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

  async exitMeeting(meetingId: number, req: any): Promise<ParticipationEntry> {
    const timeToExit: Date = new Date();

    const participationEntry: ParticipationEntry =
      await this.findOneByMeetingAndUser(meetingId, req.user.id);

    if (!participationEntry) {
      throw new HttpException(
        'Cannot exit a meeting that you did not join',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (participationEntry.exitTimestamp) {
      throw new HttpException(
        'You already exited this meeting',
        HttpStatus.BAD_REQUEST,
      );
    }

    participationEntry.exitTimestamp = timeToExit;

    const usersCount: number = await this.countAllUsersInMeeting(meetingId);

    if (usersCount === 1) {
      await this.meetingService.udpateStatus(
        meetingId,
        MEETING_STATUS_FINISHED,
      );
    }

    return this.participationEntryRepository.save(participationEntry);
  }

  async getAllUsersInMeeting(meetingId: number): Promise<User[]> {
    const meeting: Meeting = await this.meetingService.findOneById(meetingId);

    if (meeting.status == MEETING_STATUS_TO_BE_DISSCUSSED) {
      throw new HttpException(
        'This meeting has not started',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (meeting.status == MEETING_STATUS_IN_PROGRESS) {
      const participations: ParticipationEntry[] =
        await this.participationEntryRepository.find({
          where: { meeting: meetingId, exitTimestamp: IsNull() },
          relations: ['user'],
        });
      const users: User[] = participations.map(({ user }) => user);
      return users;
    }

    if (meeting.status == MEETING_STATUS_FINISHED) {
      const participations: ParticipationEntry[] =
        await this.participationEntryRepository.find({
          where: { meeting: meetingId },
          relations: ['user'],
        });
      const users: User[] = participations.map(({ user }) => user);
      return users;
    }
  }
}
