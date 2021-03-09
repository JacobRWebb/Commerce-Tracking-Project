import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1614641123004 implements MigrationInterface {
    name = 'setup1614641123004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', "lastLogout" TIMESTAMP NOT NULL DEFAULT '2021-03-01T23:25:23.228Z', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "alert_status_enum" NOT NULL DEFAULT 'un-acknowledged', "timestamp" TIMESTAMP NOT NULL DEFAULT '2021-03-01T23:25:23.229Z', "comment" character varying, "hostname" character varying NOT NULL, "file" character varying NOT NULL, "changeAgent" character varying NOT NULL, "changeProcess" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d"`);
        await queryRunner.query(`DROP INDEX "IDX_28c5d1d16da7908c97c9bc2f74"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "alert"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
