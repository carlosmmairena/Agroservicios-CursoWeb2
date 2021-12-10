import {MigrationInterface, QueryRunner} from "typeorm";

export class RelacionNuevaAnimalAdopcion1638914594906 implements MigrationInterface {
    name = 'RelacionNuevaAnimalAdopcion1638914594906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Animales\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`peso\` int NOT NULL, \`raza\` text NOT NULL, \`Descripcion\` text NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Adopciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vacunado\` tinyint NOT NULL DEFAULT 1, \`fechaAdopcion\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`idAnimal\` int NOT NULL, UNIQUE INDEX \`REL_a5a37c3175aa58d3536945bbc1\` (\`idAnimal\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Adopciones\` DROP FOREIGN KEY \`FK_a5a37c3175aa58d3536945bbc13\``);
        await queryRunner.query(`DROP INDEX \`REL_a5a37c3175aa58d3536945bbc1\` ON \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Animales\``);
    }

}
