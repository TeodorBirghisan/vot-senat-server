import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedDeprecatedUserRoleField1637787678016
  implements MigrationInterface
{
  name = 'RemovedDeprecatedUserRoleField1637787678016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying`);
  }
}
