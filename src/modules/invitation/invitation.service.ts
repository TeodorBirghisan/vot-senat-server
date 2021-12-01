import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Invitation } from "./invitation.entity";

@Injectable()
export class InvitationService {
    constructor(
        @InjectRepository(Invitation)
        private invitationRepository: Repository<Invitation>,
    ) {}

    async findByInvitationToken(invitationToken: string): Promise<Invitation> {
        const invitation: Invitation = await this.invitationRepository.findOne({
            where:{
                invitationToken
            }
        });

        if (!invitation) {
            return null;
        }

        return invitation;
    }

    async createInvitation(): Promise<Invitation> {
        //TODO create an token generator module to isolate token generation logic
        const invitation:Invitation = this.invitationRepository.create({
            invitationToken: Math.random().toString(36).slice(2, 10)
        });

        return await this.invitationRepository.save(invitation);
    }

    async deleteInvitationByToken(invitationToken: string): Promise<boolean> {
        //TODO check if invitation exists
        try{
            await this.invitationRepository.delete({invitationToken});
        }
        catch(e){
            console.log(e);
            return false;
        }
        return true;
    }
}