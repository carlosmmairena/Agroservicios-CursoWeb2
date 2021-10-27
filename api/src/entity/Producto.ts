import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Productos")
export class Producto {
    
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    nombre: string;


    @Column()
    @IsNotEmpty()
    descripcion: string;


    @Column()
    @IsNotEmpty()
    marca: string;


    @Column()
    @IsNotEmpty()
    precioUnitario: number;


    @Column()
    @IsNotEmpty()
    stock: number;


    @Column()
    @IsNotEmpty()
    unidadMedida: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;

}
