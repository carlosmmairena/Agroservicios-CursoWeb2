import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonaClientePersonaCreate1635618851435 implements MigrationInterface {
    name = 'PersonaClientePersonaCreate1635618851435'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaRegistro\` date NOT NULL, \`correo\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL, \`idPersona\` int NULL, UNIQUE INDEX \`IDX_a68e6a4cafe1df9bcf7b9f6cc7\` (\`correo\`), UNIQUE INDEX \`REL_0b506d01dbf318a922cdfbb4a5\` (\`idPersona\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Personas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellido1\` varchar(255) NOT NULL, \`apellido2\` varchar(255) NOT NULL, \`fechaNac\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`direccion\` varchar(255) NOT NULL, \`fechaRegistro\` date NOT NULL, \`correo\` varchar(255) NOT NULL, \`telefono\` tinyint NOT NULL, \`estado\` tinyint NOT NULL, \`idPersona\` int NULL, UNIQUE INDEX \`IDX_ca9d58716fcb81fe39062a36a0\` (\`correo\`), UNIQUE INDEX \`REL_e533e099b66622cdb4a99ae9a4\` (\`idPersona\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Usuarios\` ADD CONSTRAINT \`FK_0b506d01dbf318a922cdfbb4a57\` FOREIGN KEY (\`idPersona\`) REFERENCES \`bdAgroservicios\`.\`Personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Clientes\` ADD CONSTRAINT \`FK_e533e099b66622cdb4a99ae9a42\` FOREIGN KEY (\`idPersona\`) REFERENCES \`bdAgroservicios\`.\`Personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Clientes\` DROP FOREIGN KEY \`FK_e533e099b66622cdb4a99ae9a42\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Usuarios\` DROP FOREIGN KEY \`FK_0b506d01dbf318a922cdfbb4a57\``);
        await queryRunner.query(`DROP INDEX \`REL_e533e099b66622cdb4a99ae9a4\` ON \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca9d58716fcb81fe39062a36a0\` ON \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP INDEX \`REL_0b506d01dbf318a922cdfbb4a5\` ON \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_a68e6a4cafe1df9bcf7b9f6cc7\` ON \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Personas\``);
        
    }

}
