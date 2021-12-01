import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invitationToken: string;

    //TODO TBD invitation should have the email of the invited person?
    //TODO TBD invitation with expiration date?
}