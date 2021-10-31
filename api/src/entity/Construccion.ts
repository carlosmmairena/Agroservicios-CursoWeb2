import { IsBoolean } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity("Construcciones")
export class Construccion {

    @PrimaryGeneratedColumn()
    id: number;
 

    @OneToOne(() => Producto, producto => producto.construccion)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;


    @IsBoolean()
    @Column({ default: false })
    fragil: boolean;

}
