import { IsDateString, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinDate } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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


    @ManyToOne(() => Cliente, cliente => cliente.proformas)
    @JoinColumn({ name: "idCliente", referencedColumnName: "id" })
    cliente: Cliente;


    @OneToMany(() => DetalleProforma, detalle => detalle.proforma)
    detallesProformas: DetalleProforma[];


    @MinDate(new Date())
    @IsDateString()
    @Column({ type: 'date' })
    fechaEmisiom: Date;


    @MaxLength(100)
    @IsNotEmpty()
    @Column({ default: 'efectivo' })
    formaPago: string;


    @Min(0)
    @Max(100)
    @IsNumber()
    @Column({ default: 0 })
    porcentajeDescuento: number;

}
