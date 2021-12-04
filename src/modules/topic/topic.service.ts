import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}
}
