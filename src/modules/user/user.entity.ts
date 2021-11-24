import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  role: string;

  @Column({nullable: true})
  phoneNumber: string;
}