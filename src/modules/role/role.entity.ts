import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role/user-role.entity';

export enum UserRolesEnum {
  CAN_GRANT_ROLES = 'CAN_GRANT_ROLES',
  CAN_GRANT_PRESIDENT = 'CAN_GRANT_PRESIDENT',
  CAN_GRANT_VICE_PRESIDENT = 'CAN_GRANT_VICE_PRESIDENT',
  CAN_CREATE_MEETINGS = 'CAN_CREATE_MEETINGS',
  CAN_DELETE_MEETINGS = 'CAN_DELETE_MEETINGS',
  CAN_CREATE_INVITATION = 'CAN_CREATE_INVITATION',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: UserRolesEnum;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
