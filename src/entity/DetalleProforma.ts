import { IsDecimal, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proforma } from "./Proforma";


@Entity("DetallesProformas")
export class DetalleProforma {
    
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Proforma, proforma => proforma.detallesProforma)
    @JoinColumn({ name: "idProforma", referencedColumnName: "id" })
    proforma: Proforma;


    /* 
    @ManyToOne(() => Producto, producto => producto.detallesProformas)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;
     */


    @Min(1)
    @IsDecimal()
    @Column({ nullable: false })
    cantidadComprar: number;


    @Min(1)
    @IsDecimal()
    @Column({ nullable: false })
    subTotal: number;


    @Min(0)
    @IsDecimal()
    @Column({ nullable: false })
    precioUnitario: number;

}
