import { MigrationInterface, QueryRunner } from 'typeorm';

export class VoteUserAndTopicRelation1640205398948
  implements MigrationInterface
{
  name = 'VoteUserAndTopicRelation1640205398948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vote" ADD "topicId" integer`);
    await queryRunner.query(`ALTER TABLE "vote" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "vote" ADD CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote" DROP CONSTRAINT "FK_e671f989e08ccfe95b9fb4b8c06"`,
    );
    await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "topicId"`);
  }
}
