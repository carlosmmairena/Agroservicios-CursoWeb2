import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Construcciones")
export class Construccion {

    @PrimaryGeneratedColumn()
    id: number;
 

    /* 
    @OneToOne(() => Producto, producto => producto.veterinario)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;
    */

    @Column()
    @IsNotEmpty()
    fragil: boolean;

}
