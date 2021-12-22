import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { Meeting } from './../meeting/meeting.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Meeting, (meeting) => meeting.topics)
  meeting: Meeting;

  @OneToMany(() => Vote, (vote) => vote.topic)
  votes: Vote[];
}
