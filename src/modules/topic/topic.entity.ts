import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
