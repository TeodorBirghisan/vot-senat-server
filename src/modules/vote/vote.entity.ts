import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from '../topic/topic.entity';
import { User } from '../user/user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  date: Date;

  @ManyToOne(() => Topic, (topic) => topic.votes, {
    onDelete: 'CASCADE',
  })
  topic: Topic;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}
