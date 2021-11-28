import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedUserRoleManyToManyUser1637787398174
  implements MigrationInterface
{
  name = 'CreatedUserRoleManyToManyUser1637787398174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_user_role" ("userId" integer NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_cd5bf7bedcc5f7671f0a97b9224" PRIMARY KEY ("userId", "userRoleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc94447a3cabad70eb2c96f5e1" ON "user_roles_user_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4698620c2fcf96fdbabb09f384" ON "user_roles_user_role" ("userRoleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4698620c2fcf96fdbabb09f384"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc94447a3cabad70eb2c96f5e1"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_user_role"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
  }
}
