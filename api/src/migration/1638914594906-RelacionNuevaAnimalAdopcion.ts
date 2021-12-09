import {MigrationInterface, QueryRunner} from "typeorm";

export class RelacionNuevaAnimalAdopcion1638914594906 implements MigrationInterface {
    name = 'RelacionNuevaAnimalAdopcion1638914594906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Animales\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`peso\` int NOT NULL, \`raza\` text NOT NULL, \`Descripcion\` text NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Adopciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vacunado\` tinyint NOT NULL DEFAULT 1, \`fechaAdopcion\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`idAnimal\` int NOT NULL, UNIQUE INDEX \`REL_a5a37c3175aa58d3536945bbc1\` (\`idAnimal\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Consejos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`foto\` varchar(255) NOT NULL DEFAULT 'Sin fotografía.', \`estado\` tinyint NOT NULL DEFAULT 1, \`idUsuario\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Construcciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fragil\` tinyint NOT NULL DEFAULT 0, \`idProducto\` int NULL, UNIQUE INDEX \`REL_a40da1bc0ad9fb753a44535cd3\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Insumos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaVencimiento\` datetime NOT NULL, \`tipoInsumo\` varchar(255) NOT NULL, \`idProducto\` int NULL, UNIQUE INDEX \`REL_8498e8f83c3bbb2c9c10b05fbf\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Veterinarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipoAnimal\` varchar(255) NOT NULL, \`idProducto\` int NULL, UNIQUE INDEX \`REL_da05dd17030d6c6118e1162e2f\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Productos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`marca\` varchar(255) NOT NULL, \`precioUnitario\` int NOT NULL, \`stock\` int NOT NULL, \`unidadMedida\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_d1dde3da8e5146c4684a812db1\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`DetallesProformas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidadComprar\` int NOT NULL, \`subTotal\` int NOT NULL, \`precioUnitario\` int NOT NULL, \`idProforma\` int NULL, \`idProducto\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Proformas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaEmisiom\` date NOT NULL, \`formaPago\` varchar(255) NOT NULL DEFAULT 'efectivo', \`estado\` tinyint NOT NULL DEFAULT 1, \`canceled\` tinyint NOT NULL DEFAULT 0, \`porcentajeDescuento\` int NOT NULL DEFAULT '0', \`idUsuario\` int NULL, \`idCliente\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaRegistro\` date NOT NULL, \`correo\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL, \`idPersona\` int NULL, UNIQUE INDEX \`IDX_a68e6a4cafe1df9bcf7b9f6cc7\` (\`correo\`), UNIQUE INDEX \`REL_0b506d01dbf318a922cdfbb4a5\` (\`idPersona\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Personas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellido1\` varchar(255) NOT NULL, \`apellido2\` varchar(255) NOT NULL, \`fechaNac\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`direccion\` varchar(255) NOT NULL, \`fechaRegistro\` date NOT NULL, \`correo\` varchar(255) NOT NULL, \`telefono\` tinyint NOT NULL, \`estado\` tinyint NOT NULL, \`idPersona\` int NULL, UNIQUE INDEX \`IDX_ca9d58716fcb81fe39062a36a0\` (\`correo\`), UNIQUE INDEX \`REL_e533e099b66622cdb4a99ae9a4\` (\`idPersona\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Razas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_af6e1d3507f00cc7a32490f644\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Adopciones\` ADD CONSTRAINT \`FK_a5a37c3175aa58d3536945bbc13\` FOREIGN KEY (\`idAnimal\`) REFERENCES \`bdAgroservicios\`.\`Animales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` ADD CONSTRAINT \`FK_e57d566c874991f867b43ca991d\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`bdAgroservicios\`.\`Usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Construcciones\` ADD CONSTRAINT \`FK_a40da1bc0ad9fb753a44535cd36\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Insumos\` ADD CONSTRAINT \`FK_8498e8f83c3bbb2c9c10b05fbff\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Veterinarios\` ADD CONSTRAINT \`FK_da05dd17030d6c6118e1162e2f8\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` ADD CONSTRAINT \`FK_4f2dade3ba18142f93fc150e283\` FOREIGN KEY (\`idProforma\`) REFERENCES \`bdAgroservicios\`.\`Proformas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` ADD CONSTRAINT \`FK_ac4a974e2034df9a71a86bd52ce\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD CONSTRAINT \`FK_ed1eb333c180193204cf1626957\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`bdAgroservicios\`.\`Usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD CONSTRAINT \`FK_4728068b4b0ca82d5db2fbdf50a\` FOREIGN KEY (\`idCliente\`) REFERENCES \`bdAgroservicios\`.\`Clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Usuarios\` ADD CONSTRAINT \`FK_0b506d01dbf318a922cdfbb4a57\` FOREIGN KEY (\`idPersona\`) REFERENCES \`bdAgroservicios\`.\`Personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Clientes\` ADD CONSTRAINT \`FK_e533e099b66622cdb4a99ae9a42\` FOREIGN KEY (\`idPersona\`) REFERENCES \`bdAgroservicios\`.\`Personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Clientes\` DROP FOREIGN KEY \`FK_e533e099b66622cdb4a99ae9a42\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Usuarios\` DROP FOREIGN KEY \`FK_0b506d01dbf318a922cdfbb4a57\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP FOREIGN KEY \`FK_4728068b4b0ca82d5db2fbdf50a\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP FOREIGN KEY \`FK_ed1eb333c180193204cf1626957\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` DROP FOREIGN KEY \`FK_ac4a974e2034df9a71a86bd52ce\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` DROP FOREIGN KEY \`FK_4f2dade3ba18142f93fc150e283\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Veterinarios\` DROP FOREIGN KEY \`FK_da05dd17030d6c6118e1162e2f8\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Insumos\` DROP FOREIGN KEY \`FK_8498e8f83c3bbb2c9c10b05fbff\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Construcciones\` DROP FOREIGN KEY \`FK_a40da1bc0ad9fb753a44535cd36\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Consejos\` DROP FOREIGN KEY \`FK_e57d566c874991f867b43ca991d\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Adopciones\` DROP FOREIGN KEY \`FK_a5a37c3175aa58d3536945bbc13\``);
        await queryRunner.query(`DROP INDEX \`IDX_af6e1d3507f00cc7a32490f644\` ON \`bdAgroservicios\`.\`Razas\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Razas\``);
        await queryRunner.query(`DROP INDEX \`REL_e533e099b66622cdb4a99ae9a4\` ON \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca9d58716fcb81fe39062a36a0\` ON \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Clientes\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Personas\``);
        await queryRunner.query(`DROP INDEX \`REL_0b506d01dbf318a922cdfbb4a5\` ON \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_a68e6a4cafe1df9bcf7b9f6cc7\` ON \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Usuarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Proformas\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`DetallesProformas\``);
        await queryRunner.query(`DROP INDEX \`IDX_d1dde3da8e5146c4684a812db1\` ON \`bdAgroservicios\`.\`Productos\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Productos\``);
        await queryRunner.query(`DROP INDEX \`REL_da05dd17030d6c6118e1162e2f\` ON \`bdAgroservicios\`.\`Veterinarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Veterinarios\``);
        await queryRunner.query(`DROP INDEX \`REL_8498e8f83c3bbb2c9c10b05fbf\` ON \`bdAgroservicios\`.\`Insumos\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Insumos\``);
        await queryRunner.query(`DROP INDEX \`REL_a40da1bc0ad9fb753a44535cd3\` ON \`bdAgroservicios\`.\`Construcciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Construcciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Consejos\``);
        await queryRunner.query(`DROP INDEX \`REL_a5a37c3175aa58d3536945bbc1\` ON \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Adopciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Animales\``);
    }

}
