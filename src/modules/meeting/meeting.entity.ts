import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipationEntry } from '../participation-entry/partitcipation-entry.entity';
import { Topic } from '../topic/topic.entity';
import { User } from '../user/user.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.meetings)
  organizer: User;

  @Column()
  startDate: Date;

  @Column()
  status: string;

  @Column()
  title: string;

  @OneToMany(() => Topic, (topic) => topic.meeting)
  topics: Topic[];

  @OneToMany(
    () => ParticipationEntry,
    (paticipationEntry) => paticipationEntry.meeting,
  )
  paticipationEntries: ParticipationEntry[];
}
