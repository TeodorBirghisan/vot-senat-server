import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDeleteForVotes1645270964802 implements MigrationInterface {
    name = 'CascadeDeleteForVotes1645270964802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
