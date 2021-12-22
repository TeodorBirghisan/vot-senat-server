import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Meeting, (meeting) => meeting.organizer)
  meetings: Meeting[];

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles: UserRole[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
