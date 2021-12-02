import {MigrationInterface, QueryRunner} from "typeorm";

export class ManyToOneRelationMeetingUser1638433140583 implements MigrationInterface {
    name = 'ManyToOneRelationMeetingUser1638433140583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" ADD "organizerId" integer`);
        await queryRunner.query(`ALTER TABLE "meeting" ADD CONSTRAINT "FK_5031880f1f2d9bab5dda6565792" FOREIGN KEY ("organizerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" DROP CONSTRAINT "FK_5031880f1f2d9bab5dda6565792"`);
        await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "organizerId"`);
    }

}
