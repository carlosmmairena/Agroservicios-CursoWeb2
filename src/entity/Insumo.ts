import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Insumos")
export class Insumo {
 
    @PrimaryGeneratedColumn()
    id: number;
 

    /* 
    @OneToOne(() => Producto, producto => producto.veterinario)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;
    */


    @Column()
    @IsNotEmpty()
    fechaVencimiento: Date;


    @Column()
    @IsNotEmpty()
    tipoInsumo: string;

}
