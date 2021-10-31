import { IsBoolean, IsDateString, IsEmail, IsInt, IsNotEmpty, Min, MinDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./Persona";
import { Proforma } from "./Proforma";


@Entity("Clientes")
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @Column()
    direccion: string;


    @IsDateString()
    @MinDate(new Date())
    @Column({ type: 'date' })
    fechaRegistro: Date;


    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true  })
    correo: string; 


    @IsInt()
    @IsNotEmpty()
    @Column()
    telefono: boolean;


    @IsBoolean()
    @Column()
    estado: boolean;


    @OneToOne(() => Persona, persona => persona.cliente, { eager: true })
    @JoinColumn({  name: 'idPersona', referencedColumnName: 'id' })
    persona: Persona;


    @OneToMany(() => Proforma, proforma => proforma.cliente)
    proformas: Proforma[];

}
