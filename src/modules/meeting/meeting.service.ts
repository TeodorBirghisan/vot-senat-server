import { MEETING_STATUS_IN_PROGRESS } from './../../core/constants/index';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Meeting } from './meeting.entity';
import { MEETING_STATUS_TO_BE_DISSCUSSED } from 'src/core/constants';
import { MeetingDTO } from './meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Meeting[]> {
    return this.meetingsRepository.find();
  }

  async findOneById(id: number): Promise<Meeting> {
    return this.meetingsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByIdUserRelation(id: number): Promise<Meeting> {
    return this.meetingsRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
  }

  async saveOne(userId: number, meeting: MeetingDTO): Promise<Meeting> {
    const user: User = await this.userService.findOneById(userId);
    //TODO check if user exists otherwise throw
    //because organizer is null
    const newMeeting: Meeting = this.meetingsRepository.create({
      title: meeting.title,
      startDate: meeting.startDate,
      status: MEETING_STATUS_TO_BE_DISSCUSSED,
      organizer: user,
      description: meeting.description,
    });

    return this.meetingsRepository.save(newMeeting);
  }

  async joinMeeting(meetingId: number, userId: number): Promise<Meeting> {
    const meetingToJoin: Meeting = await this.findOneByIdUserRelation(
      meetingId,
    );
    const userToJoin: User = await this.userService.findOneById(userId);
    const timeToJoin: Date = new Date();

    const meetingStartDate: Date = meetingToJoin.startDate;
    if (timeToJoin < meetingStartDate) {
      console.log('Early to join');
      throw new HttpException(
        'Too early to join this meeting',
        HttpStatus.FORBIDDEN,
      );
    } else {
      // meetingToJoin.meetingParticipation = [...meetingToJoin.meetingParticipation, userToJoin];

      //TODO change status of meeting
      meetingToJoin.status = MEETING_STATUS_IN_PROGRESS;
      return await this.meetingsRepository.save(meetingToJoin);
    }
  }
}
