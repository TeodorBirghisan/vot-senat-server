import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedMeetingEntity1638099765748 implements MigrationInterface {
  name = 'CreatedMeetingEntity1638099765748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "meeting" ("id" SERIAL NOT NULL, "description" character varying, "organizator" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "meeting_meeting_participation_user" ("meetingId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1bba98f71a6f7de1b1c18f03592" PRIMARY KEY ("meetingId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1337d12a139436f88a032d49f" ON "meeting_meeting_participation_user" ("meetingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ec58e1c52c7ff51dd2d2cca58" ON "meeting_meeting_participation_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_meeting_participation_user" ADD CONSTRAINT "FK_e1337d12a139436f88a032d49f7" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_meeting_participation_user" ADD CONSTRAINT "FK_7ec58e1c52c7ff51dd2d2cca58b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting_meeting_participation_user" DROP CONSTRAINT "FK_7ec58e1c52c7ff51dd2d2cca58b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_meeting_participation_user" DROP CONSTRAINT "FK_e1337d12a139436f88a032d49f7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ec58e1c52c7ff51dd2d2cca58"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1337d12a139436f88a032d49f"`,
    );
    await queryRunner.query(`DROP TABLE "meeting_meeting_participation_user"`);
    await queryRunner.query(`DROP TABLE "meeting"`);
  }
}
