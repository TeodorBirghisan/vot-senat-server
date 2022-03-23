import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
