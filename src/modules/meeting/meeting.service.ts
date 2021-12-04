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
  ): Promise<Meeting> {
    //TODO: change mockUser to user making the request
    const mockUser: User = await this.userService.saveOne('dummyuser', '1234');

    const newMeeting: Meeting = this.meetingsRepository.create({
      startDate,
      title,
      organizer: mockUser,
      status,
    });
    return await this.meetingsRepository.save(newMeeting);
  }
}
