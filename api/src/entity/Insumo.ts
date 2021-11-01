import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity("Insumos")
export class Insumo {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    
    @OneToOne(() => Producto, producto => producto.insumo)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;
    

    @Column()
    @IsNotEmpty()
    fechaVencimiento: Date;


    @Column()
    @IsNotEmpty()
    tipoInsumo: string;

}
