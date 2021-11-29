import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
