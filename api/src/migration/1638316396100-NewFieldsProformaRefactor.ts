import {MigrationInterface, QueryRunner} from "typeorm";

export class NewFieldsProformaRefactor1638316396100 implements MigrationInterface {
    name = 'NewFieldsProformaRefactor1638316396100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD \`estado\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD \`canceled\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP COLUMN \`canceled\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP COLUMN \`estado\``);
    }

}
