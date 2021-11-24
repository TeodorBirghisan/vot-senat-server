import {MigrationInterface, QueryRunner} from "typeorm";

export class UserNameToFirstName1637712253660 implements MigrationInterface {
    name = 'UserNameToFirstName1637712253660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firstName" TO "name"`);
    }

}
