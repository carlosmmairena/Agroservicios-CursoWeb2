import {MigrationInterface, QueryRunner} from "typeorm";

export class ProformDetalleProformaTableCreate1635658170383 implements MigrationInterface {
    name = 'ProformDetalleProformaTableCreate1635658170383'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`DetallesProformas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidadComprar\` int NOT NULL, \`subTotal\` int NOT NULL, \`precioUnitario\` int NOT NULL, \`idProforma\` int NULL, \`idProducto\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Proformas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaEmisiom\` date NOT NULL, \`formaPago\` varchar(255) NOT NULL DEFAULT 'efectivo', \`porcentajeDescuento\` int NOT NULL DEFAULT '0', \`idUsuario\` int NULL, \`idCliente\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` ADD CONSTRAINT \`FK_4f2dade3ba18142f93fc150e283\` FOREIGN KEY (\`idProforma\`) REFERENCES \`bdAgroservicios\`.\`Proformas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` ADD CONSTRAINT \`FK_ac4a974e2034df9a71a86bd52ce\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD CONSTRAINT \`FK_ed1eb333c180193204cf1626957\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`bdAgroservicios\`.\`Usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` ADD CONSTRAINT \`FK_4728068b4b0ca82d5db2fbdf50a\` FOREIGN KEY (\`idCliente\`) REFERENCES \`bdAgroservicios\`.\`Clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP FOREIGN KEY \`FK_4728068b4b0ca82d5db2fbdf50a\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Proformas\` DROP FOREIGN KEY \`FK_ed1eb333c180193204cf1626957\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` DROP FOREIGN KEY \`FK_ac4a974e2034df9a71a86bd52ce\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`DetallesProformas\` DROP FOREIGN KEY \`FK_4f2dade3ba18142f93fc150e283\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Proformas\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`DetallesProformas\``);

    }

}
