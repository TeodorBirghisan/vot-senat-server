import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { User } from '../user/user.entity';

@Entity()
export class ParticipationEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.paticipationEntries)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Meeting, (meeting) => meeting.paticipationEntries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  meeting: Meeting;

  @Column()
  joinTimestamp: Date;

  @Column()
  exitTimestamp: Date;
}
