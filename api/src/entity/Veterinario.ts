import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity("Veterinarios")
export class Veterinario {

    @PrimaryGeneratedColumn()
    id: number;
 

    @Column()
    @IsNotEmpty()
    nombre: string;


    @OneToOne(() => Producto, producto => producto.veterinario)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;    


    @Column()
    @IsNotEmpty()
    tipoAnimal: string;

}
