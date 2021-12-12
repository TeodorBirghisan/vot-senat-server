import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Meeting } from './meeting.entity';

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

  //TODO: add constants for meeting status, date validation and parse
  async saveOne(
    title: string,
    startDate: Date,
    status: string,
    userId: number,
  ): Promise<Meeting> {
    const user: User = await this.userService.findOneById(userId);

    const newMeeting: Meeting = this.meetingsRepository.create({
      title: title,
      startDate: startDate,
      status: status,
      organizer: user,
      description: 'description test',
    });

    return this.meetingsRepository.save(newMeeting);
  }
}
