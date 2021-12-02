import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//TODO replace strict roles with action roles
//such as CAN_VIEW_X, CAN_CREATE_Y
export enum UserRolesEnum {
  CAN_VIEW_X = 'CAN_VIEW_X',
  CAN_VIEW_Y = 'CAN_VIEW_Y',
  CAN_VIEW_Z = 'CAN_VIEW_Z',
  CAN_CREATE_INVITATION = 'CAN_CREATE_INVITATION',
  //ADD CAN_GRANT_ROLES
}

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: UserRolesEnum;
}
