import {
  MEETING_STATUS_FINISHED,
  MEETING_STATUS_IN_PROGRESS,
  MEETING_STATUS_TO_BE_DISSCUSSED,
} from './../../core/constants/index';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Meeting } from './meeting.entity';
import { MeetingDTO } from './meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Meeting[]> {
    return this.meetingsRepository.find({
      where: {
        status: In([
          MEETING_STATUS_TO_BE_DISSCUSSED,
          MEETING_STATUS_IN_PROGRESS,
        ]),
      },
    });
  }

  async getAllFinished(): Promise<Meeting[]> {
    return this.meetingsRepository.find({
      where: { status: MEETING_STATUS_FINISHED },
    });
  }

  async findOneById(id: number): Promise<Meeting> {
    const meeting: Meeting = await this.meetingsRepository.findOne({
      where: {
        id,
      },
    });

    if (!meeting) {
      throw new HttpException('Meeting not found!', HttpStatus.BAD_REQUEST);
    }

    return meeting;
  }

  async findOneByIdWithUser(id: number): Promise<Meeting> {
    const meeting: Meeting = await this.meetingsRepository.findOne({
      where: {
        id,
      },
      relations: ['organizer'],
    });

    if (!meeting) {
      throw new HttpException('Meeting not found!', HttpStatus.BAD_REQUEST);
    }

    return meeting;
  }

  async udpateStatus(id: number, newStatus: string): Promise<void> {
    const meetingToUpdate: Meeting = await this.findOneById(id);

    meetingToUpdate.status = newStatus;

    await this.meetingsRepository.save(meetingToUpdate);
  }

  async saveOne(req: any, meeting: MeetingDTO): Promise<Meeting> {
    if (!meeting) {
      throw new HttpException(
        'Meeting cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!meeting.description) {
      meeting.description = 'No description provided';
    }

    const organizer: User = await this.userService.findOneById(req.user.id);

    if (!req.user || !organizer) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newMeeting: Meeting = this.meetingsRepository.create({
      title: meeting.title,
      startDate: meeting.startDate,
      status: MEETING_STATUS_TO_BE_DISSCUSSED,
      organizer: organizer,
      description: meeting.description,
    });

    return this.meetingsRepository.save(newMeeting);
  }

  async deleteOne(req: any, meetingId: number): Promise<number> {
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const meetingToDelete: Meeting = await this.findOneByIdWithUser(meetingId);

    if (req.user.email != meetingToDelete.organizer.email) {
      throw new HttpException(
        'Cannot delete meetings you did not create',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const deletedMeeting: Meeting = await this.meetingsRepository.remove(
      meetingToDelete,
    );

    if (!deletedMeeting) {
      throw new HttpException('Cannot delete!', HttpStatus.BAD_REQUEST);
    }

    return meetingId;
  }
}
