import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToMany(() => User)
  @JoinTable()
  meetingParticipation: User[];
}
