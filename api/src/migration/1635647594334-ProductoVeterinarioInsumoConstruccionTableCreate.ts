import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductoVeterinarioInsumoConstruccionTableCreate1635647594334 implements MigrationInterface {
    name = 'ProductoVeterinarioInsumoConstruccionTableCreate1635647594334'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Insumos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fechaVencimiento\` datetime NOT NULL, \`tipoInsumo\` varchar(255) NOT NULL, \`idProducto\` int NULL, UNIQUE INDEX \`REL_8498e8f83c3bbb2c9c10b05fbf\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Veterinarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`tipoAnimal\` varchar(255) NOT NULL, \`idProducto\` int NULL, UNIQUE INDEX \`REL_da05dd17030d6c6118e1162e2f\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Productos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`marca\` varchar(255) NOT NULL, \`precioUnitario\` int NOT NULL, \`stock\` int NOT NULL, \`unidadMedida\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bdAgroservicios\`.\`Construcciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fragil\` tinyint NOT NULL, \`idProducto\` int NULL, UNIQUE INDEX \`REL_a40da1bc0ad9fb753a44535cd3\` (\`idProducto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Insumos\` ADD CONSTRAINT \`FK_8498e8f83c3bbb2c9c10b05fbff\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Veterinarios\` ADD CONSTRAINT \`FK_da05dd17030d6c6118e1162e2f8\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Construcciones\` ADD CONSTRAINT \`FK_a40da1bc0ad9fb753a44535cd36\` FOREIGN KEY (\`idProducto\`) REFERENCES \`bdAgroservicios\`.\`Productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Construcciones\` DROP FOREIGN KEY \`FK_a40da1bc0ad9fb753a44535cd36\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Veterinarios\` DROP FOREIGN KEY \`FK_da05dd17030d6c6118e1162e2f8\``);
        await queryRunner.query(`ALTER TABLE \`bdAgroservicios\`.\`Insumos\` DROP FOREIGN KEY \`FK_8498e8f83c3bbb2c9c10b05fbff\``);
        await queryRunner.query(`DROP INDEX \`REL_a40da1bc0ad9fb753a44535cd3\` ON \`bdAgroservicios\`.\`Construcciones\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Construcciones\``);
        await queryRunner.query(`DROP INDEX \`REL_da05dd17030d6c6118e1162e2f\` ON \`bdAgroservicios\`.\`Veterinarios\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Veterinarios\``);
        await queryRunner.query(`DROP INDEX \`REL_8498e8f83c3bbb2c9c10b05fbf\` ON \`bdAgroservicios\`.\`Insumos\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Insumos\``);
        await queryRunner.query(`DROP TABLE \`bdAgroservicios\`.\`Productos\``);
    }

}
