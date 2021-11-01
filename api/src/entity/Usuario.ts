import { IsDateString, IsEmail, IsNotEmpty, MinDate, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { genSaltSync, compareSync, hashSync } from 'bcryptjs';
import { Persona } from "./Persona";
import { Consejo } from "./Consejo";
import { Proforma } from "./Proforma";


@Entity("Usuarios")
export class Usuario {
 
    @PrimaryGeneratedColumn()
    id: number;


    @IsDateString()
    @MinDate(new Date())
    @Column({ type: 'date' })
    fechaRegistro: Date;


    @Column({ unique: true, nullable: false })
    @IsEmail()
    @IsNotEmpty()
    correo: string;


    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;


    @OneToOne(() => Persona, persona => persona.usuario, { eager: true })
    @JoinColumn({  name: 'idPersona', referencedColumnName: 'id' })
    persona: Persona;


    @OneToMany(() => Consejo, consejo => consejo.usuario)
    consejos: Consejo[];


    @OneToMany(() => Proforma, proforma => proforma.usuario)
    proformas: Proforma[];


    hashPassword() : void {
        const salt    = genSaltSync(10);
        this.password = hashSync(this.password, salt);
    }


    isCorrectPassword(password:string): boolean {
        return compareSync(password, this.password);

    }

}
