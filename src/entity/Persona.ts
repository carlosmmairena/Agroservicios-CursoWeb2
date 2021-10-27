import { IsDate, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";


@Entity("Personas")
export class Persona {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    nombre: string;


    @Column()
    @IsNotEmpty()
    apellido1: string;


    @Column()
    @IsNotEmpty()
    apellido2: string;

  
    @Column()
    @IsDate()
    @IsNotEmpty()
    fechaNac: Date;


    @OneToOne(cliente => Cliente)
    @JoinColumn()
    client: Cliente;
  
}
