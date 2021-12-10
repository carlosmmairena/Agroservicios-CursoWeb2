import { IsBoolean, IsDate, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinDate } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from "util";
import { Cliente } from "./Cliente";
import { DetalleProforma } from "./DetalleProforma";
import { Usuario } from "./Usuario";


@Entity("Proformas")
export class Proforma {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Usuario, usuario => usuario.proformas)
    @JoinColumn({ name: "idUsuario", referencedColumnName: "id" })
    usuario: Usuario;


    @ManyToOne(() => Cliente, cliente => cliente.proformas, { eager: true })
    @JoinColumn({ name: "idCliente", referencedColumnName: "id" })
    cliente: Cliente;


    @OneToMany(() => DetalleProforma, detalle => detalle.proforma)
    detallesProformas: DetalleProforma[];


    @MinDate(new Date())
    @IsDate()
    @Column({ type: 'date' })
    fechaEmisiom: Date;


    @MaxLength(100)
    @IsNotEmpty()
    @Column({ default: 'efectivo' })
    formaPago: string;


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;


    @IsBoolean()
    @Column({ default: false })
    canceled: boolean;


    @Min(0)
    @Max(100)
    @IsNumber()
    @Column({ default: 0 })
    porcentajeDescuento: number;

    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (!data.idCliente) {
            dataChecked.errors['idCliente'] = 'idCliente es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.formaPago) {
            dataChecked.errors['formaPago'] = 'formaPago es requerido';
            dataChecked.hasErrors = true;
        }

        if (isNullOrUndefined(data.porcentajeDescuento)) {
            dataChecked.errors['porcentajeDescuento'] = 'porcentajeDescuento es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
