import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn()
  role: Role;
}
