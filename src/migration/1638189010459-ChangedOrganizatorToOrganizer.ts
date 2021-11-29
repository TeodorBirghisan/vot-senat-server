import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedOrganizatorToOrganizer1638189010459
  implements MigrationInterface
{
  name = 'ChangedOrganizatorToOrganizer1638189010459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting" RENAME COLUMN "organizator" TO "organizer"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meeting" RENAME COLUMN "organizer" TO "organizator"`,
    );
  }
}
