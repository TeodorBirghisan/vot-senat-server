import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import { ParticipationEntry } from '../participation-entry/partitcipation-entry.entity';
import { Vote } from '../vote/vote.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user-role/user-role.entity';

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
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Meeting, (meeting) => meeting.organizer)
  meetings: Meeting[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(
    () => ParticipationEntry,
    (paticipationEntry) => paticipationEntry.user,
  )
  paticipationEntries: ParticipationEntry[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
