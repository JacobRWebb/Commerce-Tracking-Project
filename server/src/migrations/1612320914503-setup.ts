import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1612320914503 implements MigrationInterface {
    name = 'setup1612320914503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3f4991d43d16bd55194ba4e75f9" UNIQUE ("identifier"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentState" integer DEFAULT '0', "comment" character varying, "timeStamp" TIMESTAMP NOT NULL, "hostname" character varying NOT NULL, "file" character varying NOT NULL, "change_agent" character varying NOT NULL, "change_process" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `);
        await queryRunner.query(`CREATE TABLE "user_applications_application" ("userId" uuid NOT NULL, "applicationId" uuid NOT NULL, CONSTRAINT "PK_4ea533409de3ec49193a3b29c0d" PRIMARY KEY ("userId", "applicationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0bfe7b9ee9027e47eb396c452" ON "user_applications_application" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebeacbdeac0f2eda959c423475" ON "user_applications_application" ("applicationId") `);
        await queryRunner.query(`CREATE TABLE "application_users_user" ("applicationId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d6661c46a5d2fbbff17d460111e" PRIMARY KEY ("applicationId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07b93bc85050d15c9dd0b968d0" ON "application_users_user" ("applicationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da8dd52533b5b3080b9b78471c" ON "application_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_applications_application" ADD CONSTRAINT "FK_b0bfe7b9ee9027e47eb396c4527" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_applications_application" ADD CONSTRAINT "FK_ebeacbdeac0f2eda959c423475d" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_users_user" ADD CONSTRAINT "FK_07b93bc85050d15c9dd0b968d06" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_users_user" ADD CONSTRAINT "FK_da8dd52533b5b3080b9b78471c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_users_user" DROP CONSTRAINT "FK_da8dd52533b5b3080b9b78471c9"`);
        await queryRunner.query(`ALTER TABLE "application_users_user" DROP CONSTRAINT "FK_07b93bc85050d15c9dd0b968d06"`);
        await queryRunner.query(`ALTER TABLE "user_applications_application" DROP CONSTRAINT "FK_ebeacbdeac0f2eda959c423475d"`);
        await queryRunner.query(`ALTER TABLE "user_applications_application" DROP CONSTRAINT "FK_b0bfe7b9ee9027e47eb396c4527"`);
        await queryRunner.query(`DROP INDEX "IDX_da8dd52533b5b3080b9b78471c"`);
        await queryRunner.query(`DROP INDEX "IDX_07b93bc85050d15c9dd0b968d0"`);
        await queryRunner.query(`DROP TABLE "application_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ebeacbdeac0f2eda959c423475"`);
        await queryRunner.query(`DROP INDEX "IDX_b0bfe7b9ee9027e47eb396c452"`);
        await queryRunner.query(`DROP TABLE "user_applications_application"`);
        await queryRunner.query(`DROP INDEX "IDX_28c5d1d16da7908c97c9bc2f74"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "alert"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
