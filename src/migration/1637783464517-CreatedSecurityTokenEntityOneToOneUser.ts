import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedSecurityTokenEntityOneToOneUser1637783464517 implements MigrationInterface {
    name = 'CreatedSecurityTokenEntityOneToOneUser1637783464517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "security_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_b6f38de3b6dabe8d034b187af6" UNIQUE ("userId"), CONSTRAINT "PK_137b1cb1cd1228fe114cfdd7308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "security_token" ADD CONSTRAINT "FK_b6f38de3b6dabe8d034b187af60" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "security_token" DROP CONSTRAINT "FK_b6f38de3b6dabe8d034b187af60"`);
        await queryRunner.query(`DROP TABLE "security_token"`);
    }

}
