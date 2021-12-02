import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCreatedLastName1637712399492 implements MigrationInterface {
  name = 'UserCreatedLastName1637712399492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
  }
}
