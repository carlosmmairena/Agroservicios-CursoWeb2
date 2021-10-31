import { IsBoolean, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Construccion } from "./Construccion";
import { Insumo } from "./Insumo";
import { Veterinario } from "./Veterinario";


@Entity("Productos")
export class Producto {
    
    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @MaxLength(100)
    @Column()
    nombre: string;


    @IsNotEmpty()
    @Column({ type: 'text' })
    descripcion: string;


    @MaxLength(50)
    @IsNotEmpty()
    @Column()
    marca: string;


    @IsNumber()
    @Min(0)
    @Column()
    precioUnitario: number;


    @IsNumber()
    @Min(0)
    @Column()
    stock: number;


    @MaxLength(50)
    @IsNotEmpty()
    @Column()
    unidadMedida: string;


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;


    @OneToOne(() => Veterinario, veterinario => veterinario.producto)
    veterinario: Veterinario


    @OneToOne(() => Insumo, insumo => insumo.producto)
    insumo: Insumo


    @OneToOne(() => Construccion, construccion => construccion.producto)
    construccion: Construccion

}
