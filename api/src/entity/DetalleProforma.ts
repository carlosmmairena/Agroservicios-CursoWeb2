import { IsDecimal, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Proforma } from "./Proforma";


@Entity("DetallesProformas")
export class DetalleProforma {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Proforma, proforma => proforma.detallesProformas)
    @JoinColumn({ name: "idProforma", referencedColumnName: "id" })
    proforma: Proforma;


    @ManyToOne(() => Producto, producto => producto.detalleProformas)
    @JoinColumn({ name: 'idProducto', referencedColumnName: 'id' })
    producto: Producto;


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
