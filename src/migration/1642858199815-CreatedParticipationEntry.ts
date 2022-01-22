import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedParticipationEntry1642858199815
  implements MigrationInterface
{
  name = 'CreatedParticipationEntry1642858199815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "participation_entry" ("id" SERIAL NOT NULL, "joinTimestamp" TIMESTAMP NOT NULL, "exitTimestamp" TIMESTAMP NOT NULL, "userId" integer, "meetingId" integer, CONSTRAINT "REL_5fef15805b48f35ef7e890a874" UNIQUE ("userId"), CONSTRAINT "REL_fc585737e6e212ef6866268bbf" UNIQUE ("meetingId"), CONSTRAINT "PK_34440081bd8be949e27b8a0d0a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_5fef15805b48f35ef7e890a8749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_fc585737e6e212ef6866268bbfd" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_fc585737e6e212ef6866268bbfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_5fef15805b48f35ef7e890a8749"`,
    );
    await queryRunner.query(`DROP TABLE "participation_entry"`);
  }
}
