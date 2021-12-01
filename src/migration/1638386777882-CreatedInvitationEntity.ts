import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedInvitationEntity1638386777882 implements MigrationInterface {
    name = 'CreatedInvitationEntity1638386777882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation" ("id" SERIAL NOT NULL, "invitationToken" character varying NOT NULL, CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invitation"`);
    }

}
