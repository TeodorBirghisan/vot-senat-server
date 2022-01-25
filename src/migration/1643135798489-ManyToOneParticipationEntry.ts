import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToOneParticipationEntry1643135798489
  implements MigrationInterface
{
  name = 'ManyToOneParticipationEntry1643135798489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_5fef15805b48f35ef7e890a8749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_fc585737e6e212ef6866268bbfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "REL_5fef15805b48f35ef7e890a874"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "REL_fc585737e6e212ef6866268bbf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_5fef15805b48f35ef7e890a8749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_fc585737e6e212ef6866268bbfd" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_fc585737e6e212ef6866268bbfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_5fef15805b48f35ef7e890a8749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "REL_fc585737e6e212ef6866268bbf" UNIQUE ("meetingId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "REL_5fef15805b48f35ef7e890a874" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_fc585737e6e212ef6866268bbfd" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_5fef15805b48f35ef7e890a8749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
