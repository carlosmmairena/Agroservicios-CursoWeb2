import {MigrationInterface, QueryRunner} from "typeorm";

export class ConsejoTableRefactor1636602516244 implements MigrationInterface {
    name = 'ConsejoTableRefactor1636602516244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` ADD \`estado\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` DROP COLUMN \`estado\``);
    }

}
