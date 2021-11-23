import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  role: string;

  @Column({nullable: true})
  phoneNumber: string;
}