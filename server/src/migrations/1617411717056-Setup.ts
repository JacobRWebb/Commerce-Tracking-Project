import {MigrationInterface, QueryRunner} from "typeorm";

export class Setup1617411717056 implements MigrationInterface {
    name = 'Setup1617411717056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', "lastLogout" TIMESTAMP NOT NULL DEFAULT '2021-04-03T01:01:57.279Z', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application" ("id" text NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_608bb41e7e1ef5f6d7abb07e394" UNIQUE ("name"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "alert_status_enum" AS ENUM('all', 'acknowledged', 'un-acknowledged', 'declined')`);
        await queryRunner.query(`CREATE TABLE "alert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "alert_status_enum" NOT NULL DEFAULT 'un-acknowledged', "timestamp" TIMESTAMP NOT NULL DEFAULT '2021-04-03T01:01:57.280Z', "comment" character varying, "hostname" character varying NOT NULL, "file" character varying NOT NULL, "changeAgent" character varying NOT NULL, "changeProcess" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicationId" text, "userId" uuid, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application_users_user" ("applicationId" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d6661c46a5d2fbbff17d460111e" PRIMARY KEY ("applicationId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07b93bc85050d15c9dd0b968d0" ON "application_users_user" ("applicationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da8dd52533b5b3080b9b78471c" ON "application_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_663616c3cabb930dbb74c07157c" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_users_user" ADD CONSTRAINT "FK_07b93bc85050d15c9dd0b968d06" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_users_user" ADD CONSTRAINT "FK_da8dd52533b5b3080b9b78471c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_users_user" DROP CONSTRAINT "FK_da8dd52533b5b3080b9b78471c9"`);
        await queryRunner.query(`ALTER TABLE "application_users_user" DROP CONSTRAINT "FK_07b93bc85050d15c9dd0b968d06"`);
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d"`);
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_663616c3cabb930dbb74c07157c"`);
        await queryRunner.query(`DROP INDEX "IDX_da8dd52533b5b3080b9b78471c"`);
        await queryRunner.query(`DROP INDEX "IDX_07b93bc85050d15c9dd0b968d0"`);
        await queryRunner.query(`DROP TABLE "application_users_user"`);
        await queryRunner.query(`DROP TABLE "alert"`);
        await queryRunner.query(`DROP TYPE "alert_status_enum"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}