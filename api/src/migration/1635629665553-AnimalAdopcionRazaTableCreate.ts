import {MigrationInterface, QueryRunner} from "typeorm";

export class AnimalAdopcionRazaTableCreate1635629665553 implements MigrationInterface {
    name = 'AnimalAdopcionRazaTableCreate1635629665553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Razas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_af6e1d3507f00cc7a32490f644\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Animales\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`peso\` int NOT NULL, \`Descripcion\` text NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, \`idRaza\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Adopciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vacunado\` tinyint NOT NULL DEFAULT 1, \`fechaAdopcion\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`idAnimal\` int NOT NULL, UNIQUE INDEX \`REL_a5a37c3175aa58d3536945bbc1\` (\`idAnimal\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Animales\` ADD CONSTRAINT \`FK_af3f4cd06b33a25132193028fa2\` FOREIGN KEY (\`idRaza\`) REFERENCES \`bdAgroservicios\`.\`Razas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Adopciones\` ADD CONSTRAINT \`FK_a5a37c3175aa58d3536945bbc13\` FOREIGN KEY (\`idAnimal\`) REFERENCES \`bdAgroservicios\`.\`Animales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Adopciones\` DROP FOREIGN KEY \`FK_a5a37c3175aa58d3536945bbc13\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Animales\` DROP FOREIGN KEY \`FK_af3f4cd06b33a25132193028fa2\``);
        await queryRunner.query(`DROP INDEX \`REL_a5a37c3175aa58d3536945bbc1\` ON \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Animales\``);
        await queryRunner.query(`DROP INDEX \`IDX_af6e1d3507f00cc7a32490f644\` ON \`bdAgroservicios\`.\`Razas\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Razas\``);
    }

}
