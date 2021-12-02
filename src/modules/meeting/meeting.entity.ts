import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  @ManyToOne(() => User, (user) => user.meetings)
  organizer: User;

  @Column()
  startDate: Date;

  @Column()
  status: string;

  @Column()
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  meetingParticipation: User[];
}
