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

  async saveOne(userId: number, meeting: MeetingDTO): Promise<Meeting> {
    const user: User = await this.userService.findOneById(userId);

    const newMeeting: Meeting = this.meetingsRepository.create({
      title: meeting.title,
      startDate: meeting.startDate,
      status: MEETING_STATUS_TO_BE_DISSCUSSED,
      organizer: user,
      description: meeting.description,
    });

    return this.meetingsRepository.save(newMeeting);
  }
}
