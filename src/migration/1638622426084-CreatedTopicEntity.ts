import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedTopicEntity1638622426084 implements MigrationInterface {
  name = 'CreatedTopicEntity1638622426084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topic" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "isActive" boolean NOT NULL, "meetingId" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_cdf3463d308d5c829df31cd102f" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_cdf3463d308d5c829df31cd102f"`,
    );
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
