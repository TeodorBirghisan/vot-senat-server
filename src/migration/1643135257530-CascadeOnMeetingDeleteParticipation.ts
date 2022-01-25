import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeOnMeetingDeleteParticipation1643135257530
  implements MigrationInterface
{
  name = 'CascadeOnMeetingDeleteParticipation1643135257530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_fc585737e6e212ef6866268bbfd"`,
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
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_fc585737e6e212ef6866268bbfd" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
