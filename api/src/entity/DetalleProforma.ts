import { IsDecimal, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from "util";
import { Producto } from "./Producto";
import { Proforma } from "./Proforma";


@Entity("DetallesProformas")
export class DetalleProforma {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Proforma, proforma => proforma.detallesProformas)
    @JoinColumn({ name: "idProforma", referencedColumnName: "id" })
    proforma: Proforma;


    @ManyToOne(() => Producto, producto => producto.detalleProformas, { eager: true })
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


    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (isNullOrUndefined(data.cantidadComprar)) {
            dataChecked.errors['cantidadComprar'] = 'cantidadComprar es requerido';
            dataChecked.hasErrors                 = true;
        }

        if (isNullOrUndefined(data.idProducto)) {
            dataChecked.errors['idProducto'] = 'idProducto es requerido';
            dataChecked.hasErrors            = true;
        }

        return dataChecked;
    }


    static create(product: Producto, proforma: Proforma, cantidad: number): DetalleProforma {
        
        if (isNullOrUndefined(proforma) || isNullOrUndefined(product)) {
            return undefined;
        }

        const detalle           = new DetalleProforma();
        detalle.producto        = product;
        detalle.precioUnitario  = product.precioUnitario;
        detalle.proforma        = proforma;
        detalle.cantidadComprar = cantidad;
        detalle.subTotal        = DetalleProforma.calculateSubtotal(product.precioUnitario, cantidad);

        return detalle;
    }

    static calculateSubtotal(precioUnitario: number, cantidad: number): number {
        return precioUnitario * cantidad;
    }
}
