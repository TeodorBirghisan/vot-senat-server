import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeOnMeetingDelete1643134935143 implements MigrationInterface {
  name = 'CascadeOnMeetingDelete1643134935143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_cdf3463d308d5c829df31cd102f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" DROP CONSTRAINT "FK_fc585737e6e212ef6866268bbfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_cdf3463d308d5c829df31cd102f" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_cdf3463d308d5c829df31cd102f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ADD CONSTRAINT "FK_fc585737e6e212ef6866268bbfd" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_cdf3463d308d5c829df31cd102f" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
