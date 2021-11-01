import {MigrationInterface, QueryRunner} from "typeorm";

export class ConsejoTableCreate1635620999537 implements MigrationInterface {
    name = 'ConsejoTableCreate1635620999537'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Consejos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`foto\` varchar(255) NOT NULL DEFAULT 'Sin fotografía.', \`idUsuario\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` ADD CONSTRAINT \`FK_e57d566c874991f867b43ca991d\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`bdAgroservicios\`.\`Usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` DROP FOREIGN KEY \`FK_e57d566c874991f867b43ca991d\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Consejos\``);

    }

}
