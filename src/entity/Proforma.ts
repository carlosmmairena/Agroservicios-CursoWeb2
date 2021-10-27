import { IsDateString, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleProforma } from "./DetalleProforma";
import { Usuario } from "./Usuario";


@Entity("Proformas")
export class Proforma {

    @PrimaryGeneratedColumn()
    id: number;


    /* @ManyToOne(() => Usuario, user => user.proforma)
    @JoinColumn({ name: "idUsuario", referencedColumnName: "id" })
    usuario: Usuario; */


    /*
    @ManyToOne(() => Cliente, cliente => cliente.proforma)
    @JoinColumn({ name: "idCliente", referencedColumnName: "id" })
    cliente: Cliente;
    */


    @OneToMany(() => DetalleProforma, detalle => detalle.proforma, { cascade: true })
    detallesProforma: DetalleProforma[];


    @IsDateString()
    @Column({type: 'date', default: '2021-01-01'})
    fechaEmisiom: Date;


    @IsNotEmpty()
    @Column({ default: 'efectivo' })
    formaPago: string;


    @Min(0)
    @Max(100)
    @IsNumber()
    @Column({ default: 0 })
    porcentajeDescuento: number;

}
