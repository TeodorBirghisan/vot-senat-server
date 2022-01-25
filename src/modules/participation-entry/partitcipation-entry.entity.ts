import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { User } from '../user/user.entity';

@Entity()
export class ParticipationEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Meeting, { onDelete: 'CASCADE' })
  @JoinColumn()
  meeting: Meeting;

  @Column()
  joinTimestamp: Date;

  @Column()
  exitTimestamp: Date;
}
