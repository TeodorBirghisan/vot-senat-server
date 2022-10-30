import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role/user-role.entity';

export enum UserRolesEnum {
  CAN_GRANT_PERMISSIONS_ALL = 'CAN_GRANT_PERMISSIONS_ALL',
  CAN_GRANT_PERMISSIONS_PRESIDENT = 'CAN_GRANT_PERMISSIONS_PRESIDENT',
  CAN_GRANT_PERMISSIONS_VICEPRESIDENT = 'CAN_GRANT_PERMISSIONS_VICEPRESIDENT',
  CAN_CREATE_INVITATION = 'CAN_CREATE_INVITATION',
  CAN_CREATE_MEETING = 'CAN_CREATE_MEETING',
  CAN_DELETE_MEETING = 'CAN_DELETE_MEETING',
  CAN_VOTE = 'CAN_VOTE',
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
