import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowNullForExitParticipation1643138904875
  implements MigrationInterface
{
  name = 'AllowNullForExitParticipation1643138904875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ALTER COLUMN "exitTimestamp" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participation_entry" ALTER COLUMN "exitTimestamp" SET NOT NULL`,
    );
  }
}
