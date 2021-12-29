import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedOrganizerColumn1640181087651 implements MigrationInterface {
  name = 'RemovedOrganizerColumn1640181087651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vote" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "meeting" DROP COLUMN "organizer"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD "organizer" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "vote"`);
  }
}
